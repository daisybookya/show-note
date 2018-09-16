import React from 'react';
import { connect } from 'react-redux'
import {typeMusic} from '../definition/TypeDefinition'

const yearNow = new Date().getFullYear();
const Title = (props:{}) => {
    return ( 
        <div className="header-title">
            <h1>[ Show Notes ]  </h1>
            <h2>- {yearNow}年 {typeMusic[props.category]} 近期展演資訊 -</h2>
        </div>
     );
}
const mapStateToProps = store =>{
    return{
        category:store.category
    }
}
export default connect(mapStateToProps, null)(Title)