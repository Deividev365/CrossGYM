module.exports = {
    userAge: function(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);
    

        let userAge = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
    
    
        if(month < 0 ||
           month == 0 &&
           today.getDate() <= birthDate.getDate()) {

            userAge = userAge - 1;
        
        }
    
        return userAge;
    },
    date: function(timestamp) {
        const date  = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        
        return `${year}-${day}-${month}`;

    }
}