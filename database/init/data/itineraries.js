/** The data related to the itineraries that will be initialized in the database */
const itineraries = [
  {
    _id: ObjectId('6489cd3d18f54e1c4c985492'),
    name: 'I parchi di Ravenna',
    type: 'NATURALISTIC',
    extra_points: 0,
    waypoints: [ObjectId('648b2ba1ba71ca0f34cce9b5'), ObjectId('64930b56caa070225c91b567'), ObjectId('64930b92caa070225c91b569')]
  },
  {
    _id: ObjectId('6489cdde18f54e1c4c985496'),
    name: 'I musei di Ravenna',
    type: 'CULTURAL',
    extra_points: 10,
  },
  {
    _id: ObjectId('6489cdfd18f54e1c4c985498'),
    name: 'Percorso di Dante',
    type: 'THEMED',
    description: "Un percorso che comprende visite che riguardano luoghi visitati o che sono stati d'ispirazione per Dante",
    extra_points: 12,
    waypoints: [ObjectId('648b2c46ba71ca0f34cce9b7'), ObjectId('648b2cb4ba71ca0f34cce9b9')]
  },
]