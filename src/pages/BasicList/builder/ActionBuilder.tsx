import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (
  actions: BasicListApi.Action[] | undefined | BasicListApi.TableToolBar[],
) => {
  return (actions || []).map((action) => {
    if (action.component == 'button') {
      return (
        <Button key={action.text} type={action.type as ButtonType}>
          {action.text}
        </Button>
      );
    } else {
      return null;
    }
  });
};
export default ActionBuilder;
