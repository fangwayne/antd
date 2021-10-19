// 第一次更新
// 第二次更新
// 第三次更新（服务端更新; 客户端用 git pull origin 命令拉取, 成功!）
// 第四次修改（客户端用 git pull 命令拉取)
// 5: push origin
// 6: 5:22:30 希望做版本回退处理。
import { useState, useEffect } from 'react';
import { Table, Space, Row, Col, Card, Pagination } from 'antd';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import ColumnBuilder from '../builder/ColumnBuilder';
import ActionBuilder from '../builder/ActionBuilder';

const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  // 这一句话的意思是：对 useRequest 函数传入泛型，泛型是一个对象，其中的 data 变量的类型是 BasicListApi.Data 这个 interface
  // 所以，init.data. 后面就能点出 data 的属性来，如 dataSource, meta, latout, page。都是在BasicListApi.Data 接口中定义好的。
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
    //'https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=1&per_page=10'
  );
  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>{ActionBuilder(init?.data?.layout?.tableToolBar)}</Space>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    init.run();
  }, [page, per_page]);

  const handlePageChange = (_page: any, _per_page: any) => {
    setPage(_page);
    setPerPage(_per_page);
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init.data?.meta.total || 0}
            current={init.data?.meta.page || 1}
            pageSize={init.data?.meta.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          ></Pagination>
        </Col>
      </Row>
    );
  };

  const batchLayout = () => {};
  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn)}
          pagination={false}
          loading={init.loading}
          rowKey='id'
        />
        {afterTableLayout()}
      </Card>
      {batchLayout()}
    </PageContainer>
  );
};

export default Index;

// columns={init?.data?.layout?.tableColumn
//   .concat([{title: 'ID', dataIndex: 'id', key: 'id'}])
//   .filter((item: any) => {return item.hideInColumn !== true;})
//   //.concat([{title: 'ID', dataIndex: 'id', key: 'id'}])
// }

//[{title: 'ID', dataIndex: 'id', key: 'id',hideInColumn:'true'}].concat([{name:'wayne', age:'18'}])
