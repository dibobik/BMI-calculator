import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity,AsyncStorage , Alert} from "react-native";

export default class App extends React.Component {
        state = {
        height: 0,
        mass: 0,
        resultNumber: "0",
        resultText: "",
        getValue:""

  };

  calculate = () => {
    let imc = this.state.mass/(this.state.height/100*this.state.height/100)
    this.setState({
      resultNumber: imc.toFixed(2)
    });

    if (imc < 18.5) {
      this.setState({ resultText: "Underweight" });
    } else if (imc > 18.5 && imc < 25) {
      this.setState({ resultText: "Normal Weight" });
    } else if (imc >= 25 && imc < 30) {
      this.setState({ resultText: "Overweight" });
    } else {
      this.setState({ resultText: "Obesity" });
    }
  };


  set = () => {
    if (this.state.resultNumber) {
      AsyncStorage.setItem('Number', this.state.resultNumber);
      this.setState({ resultNumber: '' });

      alert('Saved');
    } else {
      alert('Please fill rows');
    }
  };

  get = () => {
    AsyncStorage.getItem('Number').then(value =>
        this.setState({ getValue: value })
    );
  };


  clear = () => {
    AsyncStorage.clear();
    alert('Cleaned')
  }



  render()

  {
    return (

          <View style={styles.container}>

            <Text style={styles.headerText}>BMI Calculator</Text>

            <View style={styles.intro}>
              <TextInput
                  placeholder="Height"
                  keyboardType="numeric"
                  style={styles.inputHeight}
                  onChangeText={height => {
                    this.setState({ height });
                  }}
              />
              <TextInput
                  placeholder="Mass"
                  keyboardType="numeric"
                  style={styles.inputMass}
                  onChangeText={mass => {
                    this.setState({ mass });
                  }}
              />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={this.calculate}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            <Text style={styles.resultText}>Results</Text>

            <Text style={styles.result}
                  value={this.state.resultNumber}>
                  {this.state.resultNumber}
            </Text>

            <Text style={[styles.result, { fontSize: 35 , fontWeight:'bold',paddingTop:30}]}>
              {this.state.resultText}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={this.set}
            >
              <Text style={styles.buttonText} >Save </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={this.clear}
            >
              <Text style={styles.buttonText}>Clean Data </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={this.get}
            >
              <Text style={styles.buttonText}>History </Text>
            </TouchableOpacity>

            <Text style={styles.historyText}>{this.state.getValue}</Text>



          </View>

    );
  }
}

const styles = StyleSheet.create({
  historyText:{
    alignSelf: "center",
    color: "#202020",
    fontSize: 30,
    padding: 15,
    marginTop: 10
  },

  headerText:{
    color: "#202020",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold'
  },

  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  intro: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  inputHeight: {
    height: 100,
    textAlign: "center",
    width: 150,
    fontSize: 50,
    marginTop: 24,
    color: "#202020",
    borderStyle: 'solid',
    borderBottomWidth: 5,
    borderBottomColor:'#202020'
  },
  inputMass: {
    height: 100,
    textAlign: "center",
    width: 150,
    fontSize: 50,
    marginTop: 24,
    color: "#202020",
    borderStyle: 'solid',
    borderBottomWidth: 5,
    borderBottomColor:'#202020'
  },
  button: {
    backgroundColor: "#202020",
    width: '50%',
    height: 50,
    alignSelf:'center',
    marginTop: 50,
    borderRadius: 10
  },

  buttonText: {
    alignSelf: "center",
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    padding: 5
  },

  result: {
    alignSelf: "center",
    color: "#202020",
    fontSize: 65,
    padding: 15,


  },
  resultText: {
    alignSelf: "center",
    color: "#202020",
    fontSize: 50,
    padding: 15,
    marginTop: 20


  },


});
