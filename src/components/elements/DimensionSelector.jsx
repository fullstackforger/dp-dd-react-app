import React, { Component, PropTypes } from 'react';
import Checkbox from '../elements/Checkbox';
import { Link } from 'react-router';

const propTypes = {
    dimensionID: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool
    })).isRequired,
    saveSelections: PropTypes.func
};

export default class DimensionSelector extends Component {
    constructor(props) {
        super(props);

        this.saveSelections = this.saveSelections.bind(this);
        this.cacheSelection = this.cacheSelection.bind(this);

        this.state = {
            cachedOptions: props.options.map(option => {
                return { id: option.id, selected: option.selected }
            })
        }
    }

    saveSelections() {
        const saveSelections = this.props.saveSelections;
        if (saveSelections) {
            saveSelections({
                dimensionID: this.props.dimensionID,
                options: this.state.cachedOptions
            });
        }
    }

    cacheSelection({id, selected = true}) {
        const option = this.state.cachedOptions.find((option) => {
            return option.id === id
        });
        option.selected = selected;
    }

    render () {
        return (
            <div>
                <div>
                    <h3>What do you want to include?</h3>
                </div>
                { this.renderSelector() }
                <div className="margin-top--4 margin-bottom--8">
                    <a className="btn btn--primary btn--thick btn--wide btn--big margin-right--half"
                       onClick={this.saveSelections}>Save selection &gt;</a>
                    <Link className="btn btn--secondary btn--thick btn--wide btn--big"
                          to="/dd/dataset/AF001EW/customise/">Cancel</Link>
                </div>
            </div>
        )
    }

    renderSelector() {
        const dimensionID = this.props.dimensionID;
        const options = this.props.options;
        const selectorMap = {
            'dimensionList': ['D000123', 'D000124', 'D000125']
        };

        if (selectorMap.dimensionList.indexOf(dimensionID) > -1) {
            return options.map((item, key) => {
                const checkboxProps = {
                    id: item.id,
                    label: item.name,
                    value: item.id,
                    onChange: this.cacheSelection,
                    selected: item.selected === false ? false : true,
                    key
                }
                return <Checkbox {...checkboxProps} />
            });
        } else {
            return <span><i>Not supported yet.</i></span>
        }
    }
}

DimensionSelector.propTypes = propTypes;