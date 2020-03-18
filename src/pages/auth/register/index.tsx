import useFormField, { textAreaSetState } from '@/utils/hooks/use-form-filed';
import { AtButton, AtForm, AtInput, AtInputNumber, AtTextarea } from 'taro-ui';
import { Picker, View } from '@tarojs/components';
import Taro, { FunctionComponent, useEffect } from '@tarojs/taro';
import { useUser } from '@/utils/hooks/use-user';
import { useDispatch } from '@/utils/hooks/use-redux';

const Index: FunctionComponent = () => {
    const user = useUser();
    const dispatch = useDispatch();

    const genderList = ['男', '女']
    const [name, setName] = useFormField('')
    const [gender, setGender] = useFormField(0)
    const [age, setAge] = useFormField('')
    const [telPhone, setTelPhone] = useFormField('')
    const [workUnit, setWorkUnit] = useFormField('', textAreaSetState)
    useEffect(() => {
        console.log(user);
    }, [user])

    const onSubmit = async () => {
        console.log(workUnit);
        dispatch({
            type: 'global/login',
        })
    }

    return (
        <AtForm
          onSubmit={onSubmit}
        >
            <AtInput
              name='name'
              title='姓名'
              type='text'
              value={name}
              onChange={setName}
            />
            <Picker mode='selector' value={gender} range={genderList} onChange={setGender}>
                <View className='eqlis-list'>
                    <View className='eqlis-list-item'>
                        <View className='eqlis-list-item__label'>性别</View>
                        <View className='eqlis-list-item__value'>{genderList[gender]}</View>
                    </View>
                </View>
            </Picker>
            <View className='eqlis-list'>
                <View className='eqlis-list-item'>
                    <View className='eqlis-list-item__label'>年龄</View>
                    <View className='eqlis-list-item__value'>
                        <AtInputNumber
                          type='number'
                          min={0}
                          max={200}
                          step={1}
                          value={age}
                          onChange={setAge}
                        />
                    </View>
                </View>
            </View>
            <AtInput
              name='telPhone'
              title='手机号'
              type='text'
              value={telPhone}
              onChange={setTelPhone}
            />
            <View className='eqlis-list'>
                <View className='eqlis-list-item'>
                    <View className='eqlis-list-item__label'> 工作单位/公司</View>
                    <View className='eqlis-list-item__value'>
                        <AtTextarea
                          value={workUnit}
                          onChange={setWorkUnit}
                          maxLength={300}
                        />
                    </View>
                </View>
            </View>
            <AtButton formType='submit'>提交</AtButton>
        </AtForm>
    )
}
export default Index