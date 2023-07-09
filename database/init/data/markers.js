const markers = [
  { //battistero neoniano
    _id: ObjectId("648af4edeae56e17c9bb8005"),
    marker_id: "000001",
    type: "Device",
    coordinates: {
      latitude: 44.415540,
      longitude: 12.197356
    },
    points: 4
  },
  { //giardini pubblici
    _id: ObjectId("648af564eae56e17c9bb8007"),
    marker_id: "000002",
    type: "Device",
    coordinates: {
      latitude: 44.413893,
      longitude: 12.207436
    },
    points: 3
  },
  { //mausoleo teodorico
    _id: ObjectId("648af727eae56e17c9bb8009"),
    marker_id: "000003",
    type: "Device",
    coordinates: {
      latitude: 44.424959,
      longitude: 12.209186
    },
    points: 5
  },
  { //parco teodorico
    _id: ObjectId('64930acdcaa070225c91b563'),
    marker_id: '000004',
    type: 'Device',
    coordinates: {
      latitude: 44.426209,
      longitude: 12.208386
    },
    points: 7
  },
  { //rocca brancaleone
    _id: ObjectId('64930b07caa070225c91b565'),
    marker_id: '000005',
    type: 'Device',
    coordinates: {
      latitude: 44.422552,
      longitude: 12.205716
    },
    points: 7
  },
  { //giardini Speyer
    _id: ObjectId('64930b08caa070225c91b565'),
    marker_id: '000006',
    type: 'Device',
    coordinates: {
      latitude: 44.418481,
      longitude: 12.206436
    },
    points: 7
  },
  { //sant'apollinare nuovo
    _id: ObjectId('64930b08caa070335c916665'),
    marker_id: '000007',
    type: 'Device',
    coordinates: {
      latitude: 44.416713,
      longitude: 12.204492
    },
    points: 10
  },
  { //battistero degli ariani
    _id: ObjectId('64930b08caa070335c916765'),
    marker_id: '000008',
    type: 'Device',
    coordinates: {
      latitude: 44.418701,
      longitude: 12.202328
    },
    points: 8
  },
  { //sant'apollinare in classe
    _id: ObjectId('64830b08caa070335c916765'),
    marker_id: '000009',
    type: 'Device',
    coordinates: {
      latitude: 44.380070,
      longitude: 12.232506
    },
    points: 10
  },
  { //cappella arcivescovile
    _id: ObjectId('64330b08caa070335c916765'),
    marker_id: '000010',
    type: 'Device',
    coordinates: {
      latitude: 44.415220,
      longitude: 12.197684
    },
    points: 12
  },
  { //basilica san vitale
    _id: ObjectId('64330b08caa000335c916765'),
    marker_id: '000011',
    type: 'Device',
    coordinates: {
      latitude: 44.420298,
      longitude: 12.196367
    },
    points: 12
  },
  { //mausoleo galla placidia
    _id: ObjectId('64330b08caa870335c916765'),
    marker_id: '000012',
    type: 'Device',
    coordinates: {
      latitude: 44.421058,
      longitude: 12.196998
    },
    points: 12
  },
  { //palazzo teodorico
    _id: ObjectId('64440b08caa870335c916765'),
    marker_id: '000013',
    type: 'Device',
    coordinates: {
      latitude: 44.416143,
      longitude: 12.204488
    },
    points: 5
  },
  { //basilica santo spirito
    _id: ObjectId('64440b08caa870445c916765'),
    marker_id: '000014',
    type: 'Device',
    coordinates: {
      latitude: 44.418847,
      longitude: 12.202732
    },
    points: 3
  },
  { //tomba dante
    _id: ObjectId('68880b08caa870445c916765'),
    marker_id: '000015',
    type: 'Device',
    coordinates: {
      latitude: 44.416217,
      longitude: 12.200944
    },
    points: 3
  },
  { //quadrarco
    _id: ObjectId('68180b08caa870445c916765'),
    marker_id: '000016',
    type: 'Device',
    coordinates: {
      latitude: 44.416043,
      longitude: 12.200769
    },
    points: 2
  },
  { //san francesco
    _id: ObjectId('68280b08caa870445c916765'),
    marker_id: '000017',
    type: 'Device',
    coordinates: {
      latitude: 44.415785,
      longitude: 12.200940
    },
    points: 7
  },
  { //mostra dante
    _id: ObjectId('68380b08caa870445c916765'),
    marker_id: '000018',
    type: 'Device',
    coordinates: {
      latitude: 44.416038,
      longitude: 12.200446
    },
    points: 8
  },
  { //Chiostri Francescani
    _id: ObjectId('68480b08caa870445c916765'),
    marker_id: '000019',
    type: 'Device',
    coordinates: {
      latitude: 44.416205,
      longitude: 12.201189
    },
    points: 8
  },
  { //museo dante
    _id: ObjectId('68580b08caa870445c916765'),
    marker_id: '000020',
    type: 'Device',
    coordinates: {
      latitude: 44.416482,
      longitude: 12.201060
    },
    points: 5
  },
  { //casa dante
    _id: ObjectId('68680b08caa870445c916765'),
    marker_id: '000021',
    type: 'Device',
    coordinates: {
      latitude: 44.416146,
      longitude: 12.200495
    },
    points: 5
  },
  { //murales dante
    _id: ObjectId('68780b08caa870445c916765'),
    marker_id: '000022',
    type: 'Device',
    coordinates: {
      latitude: 44.418417,
      longitude: 12.197163
    },
    points: 8
  },
  { //classense
    _id: ObjectId('68980b08caa870445c916765'),
    marker_id: '000023',
    type: 'Device',
    coordinates: {
      latitude: 44.414395,
      longitude: 12.199708
    },
    points: 10
  },
  { //pineta classe
    _id: ObjectId('61880b08caa870445c916765'),
    marker_id: '000024',
    type: 'Device',
    coordinates: {
      latitude: 44.356025,
      longitude: 12.274618
    },
    points: 15
  },
  { //chiesa S. Agata
    _id: ObjectId('61881b08caa870445c916765'),
    marker_id: '000025',
    type: 'Device',
    coordinates: {
      latitude: 44.413959,
      longitude: 12.201381
    },
    points: 6
  },
  { //giardini pensili
    _id: ObjectId('61882b08caa870445c916765'),
    marker_id: '000026',
    type: 'Device',
    coordinates: {
      latitude: 44.415529,
      longitude: 12.200597
    },
    points: 8
  },
]