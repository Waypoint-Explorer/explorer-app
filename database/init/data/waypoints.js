const waypoints = [
  {
    _id: ObjectId('648b2ba1ba71ca0f34cce9b5'),
    name: "Parco Baronio",
    description: "È il secondo parco urbano, dei tre previsti dal Piano del Verde, realizzato e pienamente fruibile dalla cittadinanza. Il parco misura circa 17 ha ed ha visto la luce nel 2013 con la realizzazione del 1° stralcio con cui si sono eseguiti il movimento terra, il lago e tutto il verde di filtro; di seguito di stralci ne sono stati eseguiti altri 3 che hanno portato alla esecuzione di gran parte dei percorsi e dell’impianto vegetale nella zona interna al percorso ad anello.",
    place: "Via Fiume Montone Abbandonato, 48124 Ravenna RA, Italia",
    marker: ObjectId('648af4edeae56e17c9bb8005')
  },
  {
    _id: ObjectId('648b2c46ba71ca0f34cce9b7'),
    name: "Teatro Alighieri",
    description: "Opera, danza moderna e prosa in una sfarzosa sala ottocentesca con balconcini e decori in stile neoclassico.",
    place: "Via Angelo Mariani, 2, 48121 Ravenna RA, Italia",
    marker: ObjectId('648af564eae56e17c9bb8007')
  },
  {
    _id: ObjectId('648b2cb4ba71ca0f34cce9b9'),
    name: "Tomba di Dante",
    description: "Tomba di Dante in un piccolo sepolcro neoclassico vicino al luogo in cui si tenne il suo funerale nel 1321.",
    place: "Via Dante Alighieri, 9, 48121 Ravenna RA, Italia",
    opening_hours: {
      monday_hours: [{shift_start: 10, shift_end: 18}],
      tuesday_hours: [{shift_start: 10, shift_end: 18}],
      wednesday_hours: [{shift_start: 10, shift_end: 18}],
      thursday_hours: [{shift_start: 10, shift_end: 18}],
      friday_hours: [{shift_start: 10, shift_end: 18}],
      saturday_hours: [{shift_start: 10, shift_end: 19}],
      sunday_hours: [{shift_start: 10, shift_end: 19}],
    },
    marker: ObjectId('648af727eae56e17c9bb8009')
  }
]