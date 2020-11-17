const { gql } = require('apollo-server-express')
const typeDefs = gql`

  type Query {
    getDivisions: AreaOutPut
    getDistricts(division_id: String): AreaOutPut
    getUpazillas(district_id: String): AreaOutPut
    getUnions(upazilla_id: String): AreaOutPut
    getVillages(union_id: String): AreaOutPut
    getMunicipals(district_id: String): AreaOutPut
    getWards(municipal_id: String): AreaOutPut
  }
  
  type Mutation {
    addGeo: GeoAddOutPut
  }

  type GeoAddOutPut {
      error: Boolean
      msg: String
  }

  type AreaOutPut {
    error: Boolean
    msg: String
    data: [AreaData]
  }

  type AreaData {
    id: String
    name: String
    bn_name: String
  }
`
module.exports = typeDefs