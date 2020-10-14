import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

// model de imagens | tipo
import Image from './Image'

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  latitude: number
  
  @Column()
  longitude: number

  @Column()
  about: string

  @Column()
  instructions: string

  @Column()
  opening_hours: string

  @Column()
  open_on_weekends: boolean

  @OneToMany(() => Image, image => image.orphanage, { // campo que retorna relacionamento inverso
    cascade: ['insert', 'update'] // atualizar imagens relacionadas ao orfanato automaticamente
  })
  @JoinColumn({ name: 'orphanage_id' }) // nome da coluna que faz o relacionamento
  images: Image[]
}