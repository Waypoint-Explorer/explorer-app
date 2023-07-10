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
  },
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e5"),
    name: "Comune di Ravenna",
    email: "comune.ra@email.com",            //password: "admin2"
    hash: "$2b$10$j0scxRtBBD2fkKqw5r6M5ONF0DgbpLmPtqlvW8OGSYQ.M7mjxZkVS",
    role: "administrator",
    parking_areas: [ObjectId("62b9ac13d7a80a6e2f907785"), ObjectId("62b9ac51d7a80a6e2f907787")],
  },
  {
    _id: ObjectId("62ab48841c9ec9d5210f45e6"),
    name: "Ufficio Turismo",
    email: "turism.ra@email.com",            //password: "admin3"
    hash: "$2b$10$42WjtFYNfpzR/D5XDelVHuV2X9i9EzAc85cPdRM2pUnUO9vgQj4Wm",
    role: "administrator",
    parking_areas: [ObjectId("62b9ac94d7a80a6e2f907789"), ObjectId("62b9acbdd7a80a6e2f90778b")],
  },
]