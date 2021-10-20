import React ,{ useEffect } from 'react';
import { Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
// 
const Modal = ({ 
    modalVisible, 
    handleModal, 
    modalUri
  }: { 
    modalVisible: boolean; 
    handleModal: ()=>void ; 
    modalUri: string;
  }) => {
  const init = useRequest<{ data: PageApi.Data }>(
    `${modalUri}`
  );

  useEffect(() => {
    if(modalVisible){
      init.run();
    }
  }, [modalVisible]);

    return (
    <div>
      <AntdModal
       title="Basic Modal" 
       visible={modalVisible} 
      //  onOk={handleOk} 
       onCancel={handleModal}
       >
        {
          //JSON.stringify(init.data)
          FormBuilder(init.data?.layout?.tabs[0].data)
        }
       </AntdModal>
    </div>
    )
}
export default Modal;