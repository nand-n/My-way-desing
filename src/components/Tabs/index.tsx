'use client'
import { useState, ReactElement } from 'react';

interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {children.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer py-2 px-4 ${
              activeTab === index ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </div>
        ))}
      </div>
      <div className="p-4">
        {children.map((tab, index) =>
          activeTab === index ? <div key={index}>{tab.props.children}</div> : null
        )}
      </div>
    </div>
  );
};

interface TabProps {
  title: string;
  children: ReactElement | ReactElement[];
}

const Tab = ({ title, children }: TabProps) => {
  return <div>{children}</div>;
};

export { Tabs, Tab };
