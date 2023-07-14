/** The data related to the itineraries that will be initialized in the database */
const itineraries = [
  {
    _id: ObjectId('6489cd3d18f54e1c4c985492'),
    name: 'Verde in centro città',
    type: 'NATURALISTIC',
    extra_points: 10,
    waypoints: [ObjectId('64930b56caa070225c91b567'), ObjectId('64930b56bba070225c91b567'), ObjectId('64950b56bba070225c91b567'), ObjectId('64930b92caa070225c91b569')]
  },
  {
    _id: ObjectId('6489cdde18f54e1c4c985496'),
    name: 'Gli 8 monumenti UNESCO',
    type: 'CULTURAL',
    extra_points: 10,
    waypoints: [ObjectId('68830b92caa070225c91b571'), ObjectId('69930b92caa070225c91b571'), ObjectId('64930b92caa070225c91b568'), ObjectId('65530b92caa070225c91b571'), ObjectId('64930b92caa070225c91b571'), ObjectId('64930b92caa070225c91b570'), ObjectId('64930b56caa070335c91b567'), ObjectId('65930b92caa070225c91b571')]
  },
  {
    _id: ObjectId('6489cdfd19f54e1c4c985498'),
    name: 'La Ravenna di Dante',
    type: 'THEMED',
    description: "Un percorso che comprende i luoghi che hanno a che fare con il soggiorno del Sommo Poeta nella città di Ravenna",
    extra_points: 12,
    waypoints: [ObjectId('64994b56caa070335c91b567'), ObjectId('648b2cb4ba71ca0f34cce9b9'), ObjectId('64999b56caa070335c91b567'), ObjectId('64996b56caa070335c91b567'), ObjectId('64995b56caa070335c91b567'), ObjectId('64993b56caa070335c91b567'), ObjectId('64997b56caa070335c91b567'), ObjectId('64998b56caa070335c91b567'), ObjectId('64991b56caa070335c91b567')]
  },
  {
    _id: ObjectId('6489cdfd20f54e1c4c985498'),
    name: 'Girovagando per le viuzze',
    type: 'TOURISTIC',
    description: "Un percorso tra le vie del centro alla scoperta di luoghi suggestivi meno conosciuti",
    extra_points: 12,
    waypoints: [ObjectId('65530992bbc070225c91b571'),ObjectId('65530b92bbc070225c91b571'),ObjectId('64982b56caa070335c91b567'), ObjectId('64992b56caa070335c91b567'), ObjectId('64981b56caa070335c91b567')]
  },
  {
    _id: ObjectId('6489cd3d18f54e1c4c985555'),
    name: 'Camminata sull\'argine',
    type: 'FITNESS',
    extra_points: 15,
    waypoints: [ObjectId('62230992bbc070225c91b571'), ObjectId('62222992bbc070225c91b571'), ObjectId('62222332bbc070225c91b571')]
  },
]