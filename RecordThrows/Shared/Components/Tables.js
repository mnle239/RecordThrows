import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux'

import {darkGrey, lightGrey, orange} from "../Global"

/*
  Return: A table component
  Props: 
    event - event being displayed
    tableData - table data to be displayed
    tableHeader - header row of table
    navigation - navigation of parent component
*/
function Tables ({event, tableData, tableHeader, navigation}) {
  const widthArr = [100, 100, 100]
  return (
    <View style={styles.container}>
      <Table>
        <Row data={tableHeader} widthArr={widthArr} style={styles.header} textStyle={styles.title}/>
  
        {tableData.map((rowData, index) => (
          <TouchableOpacity key={index} 
            onPress={()=>{
              if(rowData[0]=="Meet PR")
                navigation.navigate('MoreInfo', {event:event+"Meet", info:tableData[index]})
              else
                navigation.navigate('MoreInfo', {event:event, info:tableData[index]})}
            } 
          >
            <Row
              data={rowData} widthArr={widthArr} textStyle={styles.text}
              style={{ height: 40, backgroundColor: index%2 ? lightGrey : "rgba(239,237,233,1)" }}
            />
          </TouchableOpacity>
        ))}
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignSelf:'center',
    borderWidth:1,
    borderColor:darkGrey,
    borderRadius:10,
    overflow: 'hidden',
    margin:10
  },
  header: { 
    height: 50, 
    backgroundColor: orange
  },
  title: { 
    textAlign: 'center', 
    fontFamily:'semiBold',
    fontSize:18,
    color:darkGrey
  },
  text: { 
    textAlign: 'center', 
    fontFamily:'regular',
    fontSize:16,
    color:darkGrey
  },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  hammer: store.userState.hammer,
  hammerBest: store.userState.hammerBest
})

export default connect(mapStateToProps, null)(Tables);