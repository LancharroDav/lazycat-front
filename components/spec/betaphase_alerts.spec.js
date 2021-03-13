import { mount } from 'enzyme'
import { SlowMessage } from 'components/betaphase_alerts'
// 
// /** @test {SlowMessage Alert} */
describe ('SlowMessage Alert', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<SlowMessage />)
// 
    expect(wrapper.find('h1'))
  })
})