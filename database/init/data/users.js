const users = [
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e0"),
    name: "Mario Rossi",
    email: "mario.rossi@email.com",    //password: "mario"
    hash: "$2b$10$olHkPDLiaNsvHVzQH0Jg3uS.ASybzmjtEIalb4H4e5nrTs2.ayccW",
    role: "user",
    country: "Italia",
    city: "Roma",
    birth_year: "1970",
    completed_itineraries: [ObjectId("64aedbdd1e8384c526937784"), ObjectId("64aedbdd3e8384c526937784"), ObjectId("64aedbdd7e8384c526937784"), ObjectId("64aedbdd6e8384c526937784"), ObjectId("64aedbb99e8384c526937770")],
    redeemed_coupons: [ObjectId('8399cd3d18f54e1c4c985492')],
    current_points: 25000,
  },
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e1"),
    name: "Giuseppe Verdi",
    email: "giuseppe.verdi@email.com", //password: "giuseppe"
    hash: "$2b$10$XiesktXdCuP/VMfB.00Ad.drvz8lJDnNBA.FuekVwsOYy81Hlu8Hq",
    role: "user",
    country: "San Marino",
    city: "Città di San Marino",
    birth_year: "1981",
    completed_itineraries: [ObjectId("64aedbdd2e8384c526937784"), ObjectId("64aedbdd4e8384c526937784"), ObjectId("64aedbdd5e8384c526937784"), ObjectId("64aedba29e8384c526937764"), ObjectId("64aedbd49e8384c526937784")],
    current_points: 70000,
  },
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e5"),
    name: "Comune di Ravenna",
    email: "comune.ra@email.com",            //password: "admin2"
    hash: "$2b$10$j0scxRtBBD2fkKqw5r6M5ONF0DgbpLmPtqlvW8OGSYQ.M7mjxZkVS",
    role: "administrator",
  },
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e6"),
    name: "Ufficio Turismo",
    email: "turism.ra@email.com",            //password: "admin3"
    hash: "$2b$10$42WjtFYNfpzR/D5XDelVHuV2X9i9EzAc85cPdRM2pUnUO9vgQj4Wm",
    role: "administrator",
  },
]