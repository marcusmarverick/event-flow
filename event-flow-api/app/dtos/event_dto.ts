export interface CreateEventDto {
  userId: string
  name: string
  description?: string
  dateTime: Date
  location: string
  capacity: number
  image?: string | null
}

export interface UpdateEventDto {
  eventId: string
  userId: string
  name?: string
  description?: string
  dateTime?: Date
  location?: string
  capacity?: number
  image?: string | null
}
