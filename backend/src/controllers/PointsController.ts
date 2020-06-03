import { Request, Response } from 'express'
import connection from '../database/connection'
import Knex from 'knex'

class PointsController {
  async index(request: Request, response: Response) {
    const { city, state, items } = request.query
    
    // Split the expected array and then filter only numbers
    let parsedItems = String(items).split(',').map(item => Number(item.trim())).filter( item => !Number.isNaN(item))
    
    const points = await connection('points')
      .join('point_items', 'point_items.point_id', '=', 'points.id')
      .where(builder => {
        if (parsedItems.length > 0)
          builder.whereIn('point_items.item_id', parsedItems)

        if (city)
          builder.where('points.city', String(city))
    
        if (state)
          builder.where('points.state', String(state))
      })
      .distinct()
      .select('points.*')    

    return response.json(points)
  }

  async show(request: Request, response: Response) {
    console.log("Id:");

    const id = request.params.id
        
    const point = await connection('points').where('id', id).first()

    if (!point) {
      return response.status(400).json({message: "Point not found!"})
    }

    const items = await connection('items')
      .join('point_items', 'point_items.item_id','=','items.id')
      .where('point_items.point_id', id)
      .select('items.title')

    return response.json({point, items})
  }

  async create(request: Request, response: Response) {
    const {image, name, email, whatsapp, latitude, longitude, street, city, state, items} = request.body

    const trx = await connection.transaction()

    const point = {image, name, email, whatsapp, latitude, longitude, street, city, state}

    const insertedIds = await trx('points').insert(point)
    
    const point_id = insertedIds[0]
    const pointItems = items.map((item_id: number) => {
        return {
            point_id,
            item_id
        }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return response.json({
      id: point_id,
      ...point
    })
  }
}

export default PointsController