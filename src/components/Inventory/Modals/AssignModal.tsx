import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';

interface AssignModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAssign: (address: string) => void;
}

const AssignModal: React.FC<AssignModalProps> = ({ isVisible, onClose, onAssign }) => {
  const [address, setAddress] = useState('');

  const handleAssign = () => {
    onAssign(address);
    onClose();
  };

  return (
    <Modal
      title="Assign Stock Item"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="assign" type="primary" onClick={handleAssign}>
          Assign
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Address" required>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignModal;
