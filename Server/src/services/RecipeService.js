const { Service } = require( '../../system/services/Service' );

class RecipeService extends Service {
    constructor( model ) {
        super( model );
    }
}

module.exports = { RecipeService };
