// Automotive.lk Application

var Globals = {
    'sessionData' : {
                "_id": "5864e308a20d162b30414597",
                "fName": "Test Person",
                "dateOfBirth": "2016-12-20T18:30:00.000Z",
                "email": "test@mail.com",
                "password": "123",
                "__v": 0
            },
    // Test Data
    'shoppingCart' : {
                      "1001": {
                        "_id": "584d6782fda76d1d334aae56",
                        "pid": 1001,
                        "productName": "Title1",
                        "category": "Category1",
                        "description": "Demo description 01",
                        "price": 19.99,
                        "qty": 123,
                        "totalAmount": 2458.77
                      },
                      "1002": {
                        "_id": "584d6782fda76d1d334aae57",
                        "pid": 1002,
                        "productName": "Title2",
                        "category": "Category2",
                        "description": "Demo description 02",
                        "price": 29.99,
                        "qty": 345,
                        "totalAmount": 10346.55
                      },
                      "1003": {
                        "_id": "584d6782fda76d1d334aae58",
                        "pid": 1003,
                        "productName": "Title3",
                        "category": "Category3",
                        "description": "Demo description 03",
                        "price": 39.99,
                        "qty": 534,
                        "totalAmount": 21354.66
                      }        
                    }                        
}

module.exports = Globals;