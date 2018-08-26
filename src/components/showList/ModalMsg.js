import { Modal,message } from 'antd';

export function ModalWarn() {
    Modal.warning({
      title: '記事本中已加過資訊',
    });
  }
export function ModalSuccess() {
  message.success('成功加入記事本', 2);
}
