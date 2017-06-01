import React from 'react';
import {mount} from 'enzyme';
import OpenFin from '../../src/javascript/components/openfin';

describe('OpenFin Component Test', () => {
    const wrapper = mount(<OpenFin />)
    it('should mount the component', ()=>{
        expect(OpenFin.prototype.componentDidMount.calleOnce()).toBeTruthy();
    });
});