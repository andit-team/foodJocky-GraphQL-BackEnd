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


 exports.getDivisions = async(root, args, context)=> {

    try{

        let divisionData = await division.find();
        if(!divisionData){

            let returnData = {
                error: true,
                msg: "Problem in finding Division",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "Division Data Get Successfully",
            data: divisionData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding Division",
            data: []
        }
        return returnData
    }


 }


 exports.getDistricts = async(root, args, context)=> {


    try{

        let districtData = await district.find({division_id: args.division_id});
        if(!districtData){

            let returnData = {
                error: true,
                msg: "Problem in finding district",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "district Data Get Successfully",
            data: districtData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding district",
            data: []
        }
        return returnData
    }


}


exports.getUpazillas = async(root, args, context)=> {

    try{

        let upazilaData = await upazila.find({district_id: args.district_id});
        if(!upazilaData){

            let returnData = {
                error: true,
                msg: "Problem in finding upazila",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "upazila Data Get Successfully",
            data: upazilaData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding upazila",
            data: []
        }
        return returnData
    }


}


exports.getUnions = async(root, args, context)=> {

    try{

        let unionData = await union.find({upazila_id: args.upazilla_id});
        if(!unionData){

            let returnData = {
                error: true,
                msg: "Problem in finding union",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "union Data Get Successfully",
            data: unionData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding union",
            data: []
        }
        return returnData
    }


}

exports.getVillages = async(root, args, context)=> {

    try{

        let villageData = await village.find({union_id: args.union_id});
        if(!villageData){

            let returnData = {
                error: true,
                msg: "Problem in finding village",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "village Data Get Successfully",
            data: villageData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding village",
            data: []
        }
        return returnData
    }

}


exports.getMunicipals = async(root, args, context)=> {

    try{

        let municipalData = await municipal.find({district_id: args.district_id});
        if(!municipalData){

            let returnData = {
                error: true,
                msg: "Problem in finding municipal",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "municipal Data Get Successfully",
            data: municipalData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding municipal",
            data: []
        }
        return returnData
    }


}


exports.getWards = async(root, args, context)=> {

    try{

        let wardData = await ward.find({municipal_id: args.municipal_id});
        if(!wardData){

            let returnData = {
                error: true,
                msg: "Problem in finding ward",
                data: []
            }
            return returnData

        }

        let returnData = {
            error: false,
            msg: "ward Data Get Successfully",
            data: wardData
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in finding ward",
            data: []
        }
        return returnData
    }


}