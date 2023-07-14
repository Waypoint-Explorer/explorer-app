const waypoints = [
  {
    _id: ObjectId('64981b56caa070335c91b567'),
    name: 'Chiesa di S. Agata Maggiore',
    opening_hours: {
      monday_hours: [],
      tuesday_hours: [],
      wednesday_hours: [],
      thursday_hours: [],
      friday_hours: [{shift_start: 15, shift_end: 19}],
      saturday_hours: [{shift_start: 15, shift_end: 19}],
      sunday_hours: [{shift_start: 9, shift_end: 13},{shift_start: 15, shift_end: 19}],
    },
    marker: ObjectId('61881b08caa870445c916765')
  },
  {
    _id: ObjectId('64982b56caa070335c91b567'),
    name: 'Cripta Rasponi e i Giardini Pensili del Palazzo della Provincia',
    marker: ObjectId('61882b08caa870445c916765')
  },
  {
    _id: ObjectId('64991b56caa070335c91b567'),
    name: 'Pineta di Classe',
    description: 'Dante la cita come “divina foresta spessa e viva“ al canto XXVIII del Purgatorio della Divina Commedia',
    marker: ObjectId('61880b08caa870445c916765')
  },
  {
    _id: ObjectId('64992b56caa070335c91b567'),
    name: 'Biblioteca Classense',
    marker: ObjectId('68980b08caa870445c916765')
  },
  {
    _id: ObjectId('64994b56caa070335c91b567'),
    name: 'Murales di Dante',
    description: 'Opera di Kobra',
    marker: ObjectId('68780b08caa870445c916765')
  },
  {
    _id: ObjectId('64999b56caa070335c91b567'),
    name: 'Quadrarco di Braccioforte',
    marker: ObjectId('68180b08caa870445c916765')
  },
  {
    _id: ObjectId('64998b56caa070335c91b567'),
    name: 'Basilica di San Francesco',
    marker: ObjectId('68280b08caa870445c916765')
  },
  {
    _id: ObjectId('64997b56caa070335c91b567'),
    name: 'Dante Plus',
    description: 'Un nuovo, irriverente, omaggio al Sommo Poeta. Una mostra interamente dedicata alla figura di Dante Alighieri e alla Divina Commedia',
    place: 'Via Corrado Ricci 26, 48121, Ravenna - Biblioteca A. Oriani',
    marker: ObjectId('68380b08caa870445c916765')
  },
  {
    _id: ObjectId('64996b56caa070335c91b567'),
    name: 'Chiostri Francescani',
    marker: ObjectId('68480b08caa870445c916765')
  },
  {
    _id: ObjectId('64995b56caa070335c91b567'),
    name: 'Museo Dante',
    description: 'Museo all\'interno di un chiostro con busti, dipinti e strumenti multimediali relativi all\'esilio del poeta.',
    marker: ObjectId('68580b08caa870445c916765')
  },
  {
    _id: ObjectId('64993b56caa070335c91b567'),
    name: 'Casa Dante',
    marker: ObjectId('68680b08caa870445c916765')
  },
  {
    _id: ObjectId('648b2cb4ba71ca0f34cce9b9'),
    name: "Tomba di Dante",
    description: "Tomba di Dante in un piccolo sepolcro neoclassico vicino al luogo in cui si tenne il suo funerale nel 1321.",
    place: "Via Dante Alighieri, 9, 48121 Ravenna RA, Italia",
    opening_hours: {
      monday_hours: [{shift_start: 10, shift_end: 19}],
      tuesday_hours: [{shift_start: 10, shift_end: 19}],
      wednesday_hours: [{shift_start: 10, shift_end: 19}],
      thursday_hours: [{shift_start: 10, shift_end: 19}],
      friday_hours: [{shift_start: 10, shift_end: 19}],
      saturday_hours: [{shift_start: 10, shift_end: 19}],
      sunday_hours: [{shift_start: 10, shift_end: 19}],
    },
    marker: ObjectId('68880b08caa870445c916765')
  },
  {
    _id: ObjectId('64950b56bba070225c91b567'),
    name: 'Giardini Speyer',
    marker: ObjectId('64930b08caa070225c91b565')
  },
  {
    _id: ObjectId('64930b56bba070225c91b567'),
    name: 'Rocca Brancaleone',
    marker: ObjectId('64930b07caa070225c91b565')
  },
  {
    _id: ObjectId('64930b56caa070225c91b567'),
    name: 'Parco Teodorico',
    place: 'Via Pomposa, 48122 Ravenna RA, Italia',
    marker: ObjectId('64930acdcaa070225c91b563')
  },
  {
    _id: ObjectId('64930b56caa070335c91b567'),
    name: 'Mausoleo di Teodorico',
    marker: ObjectId('648af727eae56e17c9bb8009')
  },
  {
    _id: ObjectId('64930b92caa070225c91b569'),
    name: 'Giardini Pubblici',
    marker: ObjectId('648af564eae56e17c9bb8007')
  },
  {
    _id: ObjectId('64930b92caa070225c91b568'),
    name: 'Battistero Neoniano (o degli Ortodossi)',
    marker: ObjectId('648af4edeae56e17c9bb8005')
  },
  {
    _id: ObjectId('64930b92caa070225c91b570'),
    name: 'Basilica di Sant\'Apollinare Nuovo',
    marker: ObjectId('64930b08caa070335c916665')
  },
  {
    _id: ObjectId('64930b92caa070225c91b571'),
    name: 'Battistero degli Ariani',
    marker: ObjectId('64930b08caa070335c916765')
  },
  {
    _id: ObjectId('65930b92caa070225c91b571'),
    name: 'Basilica di Sant\'Apollinare in Classe',
    marker: ObjectId('64830b08caa070335c916765')
  },
  {
    _id: ObjectId('68830b92caa070225c91b571'),
    name: 'Basilica di San Vitale',
    marker: ObjectId('64330b08caa000335c916765')
  },
  {
    _id: ObjectId('69930b92caa070225c91b571'),
    name: 'Mausoleo di Galla Placidia',
    marker: ObjectId('64330b08caa870335c916765')
  },
  {
    _id: ObjectId('65530b92caa070225c91b571'),
    name: 'Cappella Arcivescovile di Sant\'Andrea',
    marker: ObjectId('64330b08caa070335c916765')
  },
  {
    _id: ObjectId('65530b92bbc070225c91b571'),
    name: 'Palazzo di Teodorico',
    marker: ObjectId('64440b08caa870335c916765')
  },
  {
    _id: ObjectId('65530992bbc070225c91b571'),
    name: 'Basilica dello Spirito Santo',
    marker: ObjectId('64440b08caa870445c916765')
  },
  {
    _id: ObjectId('62230992bbc070225c91b571'),
    name: 'Chiusa di San Marco',
    marker: ObjectId('61882b08caa870445c916777')
  },
  {
    _id: ObjectId('62222992bbc070225c91b571'),
    name: 'Ponte Fiumi Uniti Ravenna',
    marker: ObjectId('61882222caa870445c916777')
  },
  {
    _id: ObjectId('62222332bbc070225c91b571'),
    name: 'Argine Sinistro Montone',
    marker: ObjectId('61882222c33870445c916777')
  },
]