import Taro, { FunctionComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { useTabbar } from '@/components/tabbar/use-tabbar';
import { AtButton } from 'taro-ui';
import './index.scss';

const Index: FunctionComponent = () => {
  // useTabbar(0);
  const jump = (num: number) => {
    if (num) {
      Taro.navigateTo({ url: '/pages/client/my/index' });
    } else {
      Taro.navigateTo({ url: '/pages/client/goods/index' });
    }
  };
  return (
    <View>
      <AtButton onClick={jump.bind(this, 0)}>跳转我的</AtButton>
      <AtButton onClick={jump.bind(this, 1)}>跳转二级页面</AtButton>
      client home
    </View>
  );
};
Index.options = {
  addGlobalClass: true,
};
export default Index;
