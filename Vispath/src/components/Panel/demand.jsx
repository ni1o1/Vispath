import React, { useState,useEffect } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios'; 

const treeData = [
      {
        value: 'challenge',
        title: '挑战性',
        
      },
      {
        value: 'hot',
        title: '热度',
      },
      {
        value: 'fundamental',
        title: '服务设施',
      },
    ]
  
const Demand = ({ setdemand_type, setDemandTypeAction }) => {
  const [value, setValue] = useState(setdemand_type);// 使用从props中传递的demand_type
  
  useEffect(() => {
    setValue(setdemand_type);
  }, [setdemand_type]); //使用useEffect钩子来监听demand_type的变化，并同步更新组件的本地状态。

  const onChange = async(newValue) => {
    setValue(newValue);
    setDemandTypeAction(newValue);
    
     // 发送数据到后端
     try {
      const response = await axios.post('http://localhost:5000/data', {setdemand_type: newValue });
      // 处理响应，例如：检查是否成功
      if(response.data.success) {
        console.log('Data sent successfully!');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  return (
    <>
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
    </>
  );
}
const mapStateToProps = (state) => ({
  setdemand_type: state.setdemand_type,
});

const mapDispatchToProps = (dispatch) => ({
  setDemandTypeAction: (type) => dispatch({ type: 'setdemand_type', data: type }),
});

const ConnectedDemand = connect(mapStateToProps, mapDispatchToProps)(Demand);
export default ConnectedDemand;
