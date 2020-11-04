const FoodController = require('../../controllers/food/food.controller')

const resolvers = {

  Query: {
    async getAllFoods(root, args, context) {
      let results = await FoodController.getAllFoods(root, args, context)
      return results
    },
    async getOneFood(root, args, context) {
      let result = await FoodController.getOneFood(root, args, context)
      return result
    },
  },
  Mutation: {
    async addFood(root, args, context) {
      let result = await FoodController.addFood(root, args, context)
      return result
    },
    
    async updateFood(root, args, context) {
      let result = await FoodController.updateFood(root, args, context)
      return result
    },

    async updateFoodStatus(root, args, context) {
      let result = await FoodController.updateFoodStatus(root, args, context)
      return result
    },

    async deleteFood(root, args, context) {
        let result = await FoodController.deleteFood(root, args, context)
        return result
      },
  },
};

module.exports = resolvers;