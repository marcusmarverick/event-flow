import { inject } from '@adonisjs/fold'
import EventRepository from '#repositories/event_repository'
import Event from '#models/event'

@inject()
export default class FindEventByIdUseCase {
  constructor(private eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  async execute(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id)
  }
}
