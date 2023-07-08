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
    type: 'TOURISTIC',
    extra_points: 10,
    waypoints: [ObjectId('68830b92caa070225c91b571'), ObjectId('69930b92caa070225c91b571'), ObjectId('64930b92caa070225c91b568'), ObjectId('65530b92caa070225c91b571'), ObjectId('64930b92caa070225c91b571'), ObjectId('64930b92caa070225c91b570'), ObjectId('64930b56caa070335c91b567'), ObjectId('65930b92caa070225c91b571')]
  },
  {
    _id: ObjectId('6489cdfd18f54e1c4c985498'),
    name: 'Sulle tracce di Teodorico',
    type: 'THEMED',
    description: "Un percorso che comprende luoghi fatti costruire da Teodorico o in cui viene raffigurato",
    extra_points: 12,
    waypoints: [ObjectId('64930b92caa070225c91b571'), ObjectId('65530992bbc070225c91b571'), ObjectId('64930b92caa070225c91b570'), ObjectId('65530b92bbc070225c91b571'), ObjectId('64930b56caa070335c91b567')]
  },
]