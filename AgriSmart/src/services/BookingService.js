// This code is for the booking service which consists of the fetch up details of the farmers and 
// the drivers and enabling them to get the details of ezach other.

// The pooling algorithm in this code works considering the weight of the goods the driver is carrying long with
// the type of grains and thereby schedules the next pickup point for the corressponding farmer.


import  React, {Component} from 'react'
import { ToastAndroid } from 'react-native';
// toast android module  enables us to show a small message
// on the screen similar to a pop-up notification.

class BookingService extends Component {
  constructor(props){
    super(props);
    this.state = {
      // details of farmers which primarily includes name,contact details (phone no,email,address and an OTP)
      farmers: [
        {
            "name": "Ajinkya",
            "contactDetails": {
              "phoneno": "952417890",
              "email": "aj@gmail.com",
              "address": "admin@shyamNagar",
              "permanentOTP" : 5436
            },
            // The coordinates of the source point
            "locations": {
              "origin": {
                  latitude: 22.7667289,
                  longitude: 75.8963559
              },
              // The coordinates of the destination
              "destination": {
                latitude: 23.7021334,
                longitude: 76.8166327
              },
              // Integrated through GOOGLE API as that would help us to calculate the distance
              
            },
            // shipping details that includes the type of the grains,date of delivery,weight of the goods
            "shippingDetails": {
              "grainType": "Fruits/Vegetable",
              "dateOfDelivery": "13/12/2020",
              "weight": 500,
            },
            "reqStatus": "True",
            "timeStamp": "1234",
        },
        // the same parameters for different farmers
        {
            "name": "Abhishek",
            "contactDetails": {
              "phoneno": "952417890",
              "email": "aj@gmail.com",
              "address": "admin@shyamNagar",
              "permanentOTP" : 5436
            },
            "locations": {
              "origin": {
                  latitude: 22.7067289,
                  longitude: 75.8063559
              },
              "destination": {
                latitude: 22.7321334,
                longitude: 75.8966327
              },
            },
            "shippingDetails": {
              "grainType": "Grains",
              "dateOfDelivery": "13/12/2020",
              "weight": 400,
            },
            "reqStatus": "True",
            "timeStamp": "1234",
        },
        {
            "name": "Ritik",
            "contactDetails": {
              "phoneno": "952417890",
              "email": "aj@gmail.com",
              "address": "admin@shyamNagar",
              "permanentOTP" : 5436
            },
            "locations": {
              "origin": {
                  latitude: 22.7267289,
                  longitude: 75.8163559
              },
              "destination": {
                latitude: 23.7021334,
                longitude: 77.89966327
              },
            },
            "shippingDetails": {
              "grainType": "Fruits/Vegetable",
              "dateOfDelivery": "13/12/2020",
              "weight": 500,
            },
            "reqStatus": "True",
            "timeStamp": "1234",
        },
        {
            "name": "Deeksha",
            "contactDetails": {
              "phoneno": "952417890",
              "email": "aj@gmail.com",
              "address": "admin@shyamNagar",
              "permanentOTP" : 5436
            },
            "locations": {
              "origin": {
                  latitude: 22.7267289,
                  longitude: 75.8233559
              },
              "destination": {
                latitude: 22.7311334,
                longitude: 75.8346327
              },
            },
            "shippingDetails": {
              "grainType": "Grains",
              "dateOfDelivery": "13/12/2020",
              "weight": 300,
            },
            "reqStatus": "True",
            "timeStamp": "1234",
        },
        {
            "name": "Mahak",
            "contactDetails": {
              "phoneno": "952417890",
              "email": "aj@gmail.com",
              "address": "admin@shyamNagar",
              "permanentOTP" : 5436
            },
            "locations": {
              "origin": {
                  latitude: 22.7327289,
                  longitude: 75.83263559
              },
              "destination": {
                latitude: 22.7921334,
                longitude: 75.81966327
              },
            },
            "shippingDetails": {
              "grainType": "Fruits/Vegetable",
              "dateOfDelivery": "13/12/2020",
              "weight": 1000,
            },
            "reqStatus": "True",
            "timeStamp": "1234",
        },
    ],
    // The details of the drivers which are similar to the farmers but then it would be decided upon the distance of the coordinates
    drivers: [
      {
          "name": "Taranekar",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjA0Yjg0MGZjNWI0NTAwMjQzNWExYWQiLCJpYXQiOjE1OTYyOTQxNTB9.MZdWWaprLPstKwGtbwWgjfSpD2donH70wwn3CbYwi5Q",
          "contactDetails": {
            "phoneno": "952417890",
            "email": "aj@gmail.com",
            "address": "admin@shyamNagar",
          },
          "locations": {
            "origin": {
                latitude: 22.7667289,
                longitude: 75.7963559
            },
            "destination": {
              latitude: 22.7021334,
              longitude: 75.8166327
            },
          },
          "shippingDetails": {
            "grainType": "Fruits/Vegetable",
            "dateOfDelivery": "13/12/2020",
            "weight": 2000,
          },
          "reqStatus": "True",
          "timeStamp": "1234",
      },
      {
          "name": "Baghel",
          "contactDetails": {
            "phoneno": "952417890",
            "email": "aj@gmail.com",
            "address": "admin@shyamNagar",
          },
          "locations": {
            "origin": {
                latitude: 22.6967289,
                longitude: 75.6763559
            },
            "destination": {
              latitude: 22.7321334,
              longitude: 75.8966327
            },
          },
          "shippingDetails": {
            "grainType": "Grains",
            "dateOfDelivery": "13/12/2020",
            "weight": 400,
          },
          "reqStatus": "True",
          "timeStamp": "1234",
      },
      {
          "name": "Nandwal",
          "contactDetails": {
            "phoneno": "952417890",
            "email": "aj@gmail.com",
            "address": "admin@shyamNagar",
          },
          "locations": {
            "origin": {
                latitude: 22.6467289,
                longitude: 75.8763559
            },
            "destination": {
              latitude: 22.7021334,
              longitude: 75.89966327
            },
          },
          "shippingDetails": {
            "grainType": "Fruits/Vegetable",
            "dateOfDelivery": "13/12/2020",
            "weight": 800,
          },
          "reqStatus": "True",
          "timeStamp": "1234",
      },
      {
          "name": "Soni",
          "contactDetails": {
            "phoneno": "952417890",
            "email": "aj@gmail.com",
            "address": "admin@shyamNagar",
          },
          "locations": {
            "origin": {
                latitude: 22.6967289,
                longitude: 75.86233559
            },
            "destination": {
              latitude: 22.7311334,
              longitude: 75.8346327
            },
          },
          "shippingDetails": {
            "grainType": "Grains",
            "dateOfDelivery": "13/12/2020",
            "weight": 800,
          },
          "reqStatus": "True",
          "timeStamp": "1234",
      },
      {
          "name": "Mandlecha",
          "contactDetails": {
            "phoneno": "952417890",
            "email": "aj@gmail.com",
            "address": "admin@shyamNagar",
          },
          "locations": {
            "origin": {
                latitude: 22.8027289,
                longitude: 75.87263559
            },
            "destination": {
              latitude: 22.7921334,
              longitude: 75.81966327
            },
          },
          "shippingDetails": {
            "grainType": "Fruits/Vegetable",
            "dateOfDelivery": "13/12/2020",
            "weight": 600,
          },
          "reqStatus": "True",
          "timeStamp": "1234",
      },
]
    };
    this.intialStage();
  }
  // invoked immediately after the component is mounted
  componentDidMount() {
  }
  intialStage(){
    console.log("setting");
  }
  
  getDrivers(){
  
  }
  getFarmers(){

  }
  //  the function returns the distance wherein we have inputted the latitudes and longitudes
  getDistance(origin, destination){
    var lat1 = Math.PI * origin["latitude"]/180;
    var lat2 = Math.PI * destination["latitude"]/180;
    var lon1 = Math.PI * origin["longitude"]/180;
    var lon2 = Math.PI * destination["longitude"]/180;
    // Haversine formula 
    // determines the great-circle distance between two points on a sphere given their longitudes and latitudes.
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.sin(dlat / 2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2)**2;
    //console.log(lat1,lat2);
    return 2 * Math.asin(Math.sqrt(a)) * 6371;
  }
  // this function is basically for the farmers where they find the nearby drivers
  getNearby(location,mode){
    if (mode != 'farmer'){
      let drivers = [];
      console.log("finding nearby drivers");
      for (let driver of this.state.drivers){
          if (driver["reqStatus"] && 
              this.getDistance(location, driver["locations"]["origin"]) <= 20 ){
                drivers.push(driver["locations"]["origin"]);
              }
      } 
      // the farmer gets the location of the nearest driver to him 
      return drivers;  
    }
    // this function is basically for the farmers where they find the nearby farmers
    else{
      let farmers = [];
      console.log("finding nearby farmers");
      for (let farmer of this.state.farmers){ 
        if (farmer["reqStatus"] && 
            this.getDistance(location, farmer["locations"]["origin"]) <= 20){
                farmers.push(farmer["locations"]["origin"]);
              }
      }
      // the farmer gets the location of the nearest farmer to him 
      return farmers;  
    }
  }
  
  // Now the find driver function is checked with the corressponding parameters of location,type of goods and weight of goods
  findDrivers(location, type, weight){
    for (let driver of this.state.drivers){
      console.log( driver["reqStatus"]);
        if (driver["reqStatus"] && 
            type == driver["shippingDetails"]["grainType"] && 
            parseInt(weight) <=  driver["shippingDetails"]["weight"] && 
            this.getDistance(location, driver["locations"]["origin"]) <= 30 ){
              driver["reqStatus"] = false
              return driver;
            }
    }
      // corressponding conditions are checked and they are returned accordingly
    ToastAndroid.show('No Driver Available \n Try Again Later', ToastAndroid.SHORT);
    // a pop-up to be shown if there is no driver available with the corressponding parameters sent by the farmer
    return {};
  }
  // almost the same function as find driver but then this is for the farmers with the same arguments and functionality
  findFarmers(location, type, weight){
    for (let farmer of this.state.farmers){ 
      console.log(farmer)
      if (farmer["reqStatus"] && 
            type == farmer["shippingDetails"]["grainType"] && 
            parseInt(weight) >= farmer["shippingDetails"]["weight"] && 
            this.getDistance(location, farmer["locations"]["origin"]) <= 30
            ){
              farmer["reqStatus"] = false
              return farmer;
            }
    }
    // corresponding conditions to be checked
    ToastAndroid.show('No Farmer Available \n Try Again Later', ToastAndroid.SHORT);
    return {};
  }
  // This is the main algorithm of the booking service wherein the farmers get 
  // the drivers nearby them ,depending on the weight of the goods and the location 
  pooling(){
    var numberOfDrivers = this.state.drivers.length
    
    var result = {};
    for(var i = 0 ; i < numberOfDrivers ; i++){
      result["driver"+String(i+1)]=[]
    }
    var i = 0;
    for (let driver of this.state.drivers){
      batchWeight = 0
      result["driver"+String(i+1)].push(driver)
      for (let farmer of this.state.farmers){ 
        // the conditions of the shipping details to be checked , basically the weight and the type of grain
        if(batchWeight + farmer["shippingDetails"]["weight"] > driver["shippingDetails"]["weight"])
          continue
        else if(farmer["reqStatus"] && 
          driver["shippingDetails"]["grainType"] == farmer["shippingDetails"]["grainType"] && 
          this.getDistance(driver["locations"]["origin"], farmer["locations"]["origin"]) <= 40){
            batchWeight	+= farmer["shippingDetails"]["weight"]
            farmer["reqStatus"] = false
            result["driver"+String(i+1)].push(farmer)
        }
      }
      driver["reqStatus"] = false        
      i++
    }
    console.log(result)
    return result;
  }

  render(){
    return (
      <View>
        <Text>Send Notification</Text>
      </View>
    )
  }
  // returns a reference to the component
}
// Checking the conditions and the corressponding output is generated through notifications
const booking = new BookingService()
export default booking;
