import { Tag, Space } from 'antd';
import moment from 'moment';
import ActionBuilder from './ActionBuilder';

const ColumnBuilder = (tableColumn: BasicListApi.TableColumn[] | undefined) => {
  const newColumns: BasicListApi.TableColumn[] = [];
  //(init?.data?.layout.tableColumn || []).forEach((column: any) => {
  (tableColumn || []).forEach((column: any) => {
    // if (column.type === "datetime"){
    //   column.render = (value:any) =>{
    //     return moment(value).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // }
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: any) => moment(value).format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'switch':
          column.render = (value: any) => {
            const option = (column.data || []).find((item: any) => item.value === value);
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;
        case 'actions':
          column.render = () => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
          };
          break;
        default:
          break;
      }
      newColumns.push(column);
    }
  });
  const idColumns = [{ title: 'ID', dataIndex: 'id', key: 'id' }].concat(newColumns);
  return idColumns;
};

export default ColumnBuilder;
