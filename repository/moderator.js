const Repository = require('./base').Repository;
class ModeratorRepository extends Repository{
    constructor() {
        super();
    }

    findAll = async function(){
        const query = "SELECT * FROM MODERATOR";
        const params = [];
        const result = await this.query(query,params);
        console.log("All moderators");
        return result;
    }

    findOne = async function(id){
        // Binding occurs serially as present in the array
        const query = "SELECT * FROM MODERATOR WHERE moderator_id = :moderator_id";
        const params = [id];
        const result = await this.query(query,params);
        console.log(result);
        return result;
    }

}

exports.ModeratorRepository = ModeratorRepository;