/**
 * Generate All Geo Collections------------------------------------------
 */

 const division = require("../../models/division.model")
 const district = require("../../models/districts.model")
 const municipal = require("../../models/municipals.model")
 const upazila = require("../../models/upazila.model")
 const union = require("../../models/union.model")
 const village = require("../../models/village.model")
 const ward = require("../../models/ward.model")

 const division_json = require("../../geo_json/divisions.json")
 const district_json = require("../../geo_json/districts.json")
 const municipal_json = require("../../geo_json/municipals.json")
 const upazila_json = require("../../geo_json/upazilas.json")
 const union_json = require("../../geo_json/unions.json")
 const village_json = require("../../geo_json/villages.json")
 const ward_json = require("../../geo_json/wards.json")

 exports.generateAllGeo = async(root, args, context)=> {


    try{

        let divisionResult = await division.insertMany(division_json)
        if(!divisionResult){
            return{
                error: true,
                msg: "Division Data Adding Failed"
            }
        }
        let districtResult = await district.insertMany(district_json)
        if(!districtResult){
            return{
                error: true,
                msg: "District Data Adding Failed"
            }
        }
        let municipialResult = await municipal.insertMany(municipal_json)
        if(!municipialResult){
            return{
                error: true,
                msg: "Municipal Data Adding Failed"
            }
        }
        let upazilaResult = await upazila.insertMany(upazila_json)
        if(!upazilaResult){
            return{
                error: true,
                msg: "Upazilla Data Adding Failed"
            }
        }
        let unionResult = await union.insertMany(union_json)
        if(!unionResult){
            return{
                error: true,
                msg: "Union Data Adding Failed"
            }
        }
        let villageResult = await village.insertMany(village_json)
        if(!villageResult){
            return{
                error: true,
                msg: "Village Data Adding Failed"
            }
        }
        let wardResult = await ward.insertMany(ward_json)
        if(!wardResult){
            return{
                error: true,
                msg: "Ward Data Adding Failed"
            }
        }

        return{
            error: false,
            msg: "Geo Data added successfully"
        }



    }catch(error){

        return{
            error: true,
            msg: "Data Adding Failed"
        }

    }


 }