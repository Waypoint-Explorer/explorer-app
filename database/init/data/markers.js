const markers = [
  { //battistero neoniano
    _id: ObjectId("648af4edeae56e17c9bb8005"),
    marker_id: "6525230542987194",
    type: "Device",
    coordinates: {
      latitude: 44.415540,
      longitude: 12.197356
    },
    points: 400
  },
  { //giardini pubblici
    _id: ObjectId("648af564eae56e17c9bb8007"),
    marker_id: "0426143873014407",
    type: "Device",
    coordinates: {
      latitude: 44.413893,
      longitude: 12.207436
    },
    points: 200
  },
  { //mausoleo teodorico
    _id: ObjectId("648af727eae56e17c9bb8009"),
    marker_id: "0311928944468437",
    type: "Device",
    coordinates: {
      latitude: 44.424959,
      longitude: 12.209186
    },
    points: 500
  },
  { //parco teodorico
    _id: ObjectId('64930acdcaa070225c91b563'),
    marker_id: '0094705962231462360004',
    type: 'Device',
    coordinates: {
      latitude: 44.426209,
      longitude: 12.208386
    },
    points: 200
  },
  { //rocca brancaleone
    _id: ObjectId('64930b07caa070225c91b565'),
    marker_id: '7774528093325162',
    type: 'Device',
    coordinates: {
      latitude: 44.422552,
      longitude: 12.205716
    },
    points: 300
  },
  { //giardini Speyer
    _id: ObjectId('64930b08caa070225c91b565'),
    marker_id: '0566208379678912',
    type: 'Device',
    coordinates: {
      latitude: 44.418481,
      longitude: 12.206436
    },
    points: 100
  },
  { //sant'apollinare nuovo
    _id: ObjectId('64930b08caa070335c916665'),
    marker_id: '6431605197938971',
    type: 'Device',
    coordinates: {
      latitude: 44.416713,
      longitude: 12.204492
    },
    points: 500
  },
  { //battistero degli ariani
    _id: ObjectId('64930b08caa070335c916765'),
    marker_id: '6371302950598219',
    type: 'Device',
    coordinates: {
      latitude: 44.418701,
      longitude: 12.202328
    },
    points: 450
  },
  { //sant'apollinare in classe
    _id: ObjectId('64830b08caa070335c916765'),
    marker_id: '3296714001606615',
    type: 'Device',
    coordinates: {
      latitude: 44.380070,
      longitude: 12.232506
    },
    points: 400
  },
  { //cappella arcivescovile
    _id: ObjectId('64330b08caa070335c916765'),
    marker_id: '2518170982133089',
    type: 'Device',
    coordinates: {
      latitude: 44.415220,
      longitude: 12.197684
    },
    points: 500
  },
  { //basilica san vitale
    _id: ObjectId('64330b08caa000335c916765'),
    marker_id: '4701975088032221',
    type: 'Device',
    coordinates: {
      latitude: 44.420298,
      longitude: 12.196367
    },
    points: 500
  },
  { //mausoleo galla placidia
    _id: ObjectId('64330b08caa870335c916765'),
    marker_id: '6774955875269984',
    type: 'Device',
    coordinates: {
      latitude: 44.421058,
      longitude: 12.196998
    },
    points: 500
  },
  { //palazzo teodorico
    _id: ObjectId('64440b08caa870335c916765'),
    marker_id: '6658693930302361',
    type: 'Device',
    coordinates: {
      latitude: 44.416143,
      longitude: 12.204488
    },
    points: 400
  },
  { //basilica santo spirito
    _id: ObjectId('64440b08caa870445c916765'),
    marker_id: '3005115550624120',
    type: 'Device',
    coordinates: {
      latitude: 44.418847,
      longitude: 12.202732
    },
    points: 300
  },
  { //tomba dante
    _id: ObjectId('68880b08caa870445c916765'),
    marker_id: '3183596853813669',
    type: 'Device',
    coordinates: {
      latitude: 44.416217,
      longitude: 12.200944
    },
    points: 300
  },
  { //quadrarco
    _id: ObjectId('68180b08caa870445c916765'),
    marker_id: '5694325518582033',
    type: 'Device',
    coordinates: {
      latitude: 44.416043,
      longitude: 12.200769
    },
    points: 150
  },
  { //san francesco
    _id: ObjectId('68280b08caa870445c916765'),
    marker_id: '4685689195684474',
    type: 'Device',
    coordinates: {
      latitude: 44.415785,
      longitude: 12.200940
    },
    points: 400
  },
  { //mostra dante
    _id: ObjectId('68380b08caa870445c916765'),
    marker_id: '4355543917045252',
    type: 'Device',
    coordinates: {
      latitude: 44.416038,
      longitude: 12.200446
    },
    points: 200
  },
  { //Chiostri Francescani
    _id: ObjectId('68480b08caa870445c916765'),
    marker_id: '8852409757653210',
    type: 'Device',
    coordinates: {
      latitude: 44.416205,
      longitude: 12.201189
    },
    points: 300
  },
  { //museo dante
    _id: ObjectId('68580b08caa870445c916765'),
    marker_id: '1067803485131961',
    type: 'Device',
    coordinates: {
      latitude: 44.416482,
      longitude: 12.201060
    },
    points: 200
  },
  { //casa dante
    _id: ObjectId('68680b08caa870445c916765'),
    marker_id: '6971470233138128',
    type: 'Device',
    coordinates: {
      latitude: 44.416146,
      longitude: 12.200495
    },
    points: 150
  },
  { //murales dante
    _id: ObjectId('68780b08caa870445c916765'),
    marker_id: '1460486004375680',
    type: 'Device',
    coordinates: {
      latitude: 44.418417,
      longitude: 12.197163
    },
    points: 220
  },
  { //classense
    _id: ObjectId('68980b08caa870445c916765'),
    marker_id: '2577001831691000',
    type: 'Device',
    coordinates: {
      latitude: 44.414395,
      longitude: 12.199708
    },
    points: 300
  },
  { //pineta classe
    _id: ObjectId('61880b08caa870445c916765'),
    marker_id: '1514125928466858',
    type: 'Device',
    coordinates: {
      latitude: 44.356025,
      longitude: 12.274618
    },
    points: 300
  },
  { //chiesa S. Agata
    _id: ObjectId('61881b08caa870445c916765'),
    marker_id: '1943424801586435',
    type: 'Device',
    coordinates: {
      latitude: 44.413959,
      longitude: 12.201381
    },
    points: 350
  },
  { //giardini pensili
    _id: ObjectId('61882b08caa870445c916765'),
    marker_id: '3045809526086273',
    type: 'Device',
    coordinates: {
      latitude: 44.415529,
      longitude: 12.200597
    },
    points: 400
  },
  { //chiusa di san marco
    _id: ObjectId('61882b08caa870445c916777'),
    marker_id: '2045809526086273',
    type: 'Device',
    coordinates: {
      latitude: 44.389257,
      longitude: 12.168847
    },
    points: 250
  },
  { //ponte fiumi uniti
    _id: ObjectId('61882222caa870445c916777'),
    marker_id: '2045802222086273',
    type: 'Device',
    coordinates: {
      latitude: 44.398044,
      longitude: 12.215068
    },
    points: 200
  },
  { //argine
    _id: ObjectId('61882222c33870445c916777'),
    marker_id: '2045802333086273',
    type: 'Device',
    coordinates: {
      latitude: 44.395011,
      longitude: 12.190955
    },
    points: 100
  },
  ]