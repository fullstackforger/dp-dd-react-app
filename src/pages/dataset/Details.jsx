import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { requestMetadata } from './actions';
import DocumentTitle from '../../components/elements/DocumentTitle';

class Details extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const dispatch = this.props.dispatch;
        dispatch(requestMetadata(this.props.params.id));
    }

    render () {
        const page = {};
        if (this.props.metadata) {
            page.description =  this.props.metadata.description
            page.title = this.props.title
        }

        return (
            <div>
                <div className="col--lg-two-thirds">
                    <DocumentTitle title={page.title}>
                        <h1 className="margin-bottom-md--0">{page.title}</h1>
                    </DocumentTitle>

                    <p className="page-intro__content margin-bottom-md--1">{page.description}</p>

                    <Link to={`/dd/dataset/${this.props.params.id}/download`}
                          className="btn btn--primary btn--thick btn--big btn--wide margin-top--2 font-size--17">
                            <strong>Download the complete dataset &gt;</strong>
                    </Link>
                    <br />
                    <Link to={`/dd/dataset/${this.props.params.id}/customise`}
                          className="btn btn--primary btn--thick btn--big btn--wide margin-top--2 font-size--17">
                            <strong>Customise this dataset</strong>
                    </Link>

                    <p className="margin-bottom--8 margin-top--4">
                        <strong>Supporting information</strong><br />
                        &middot;&nbsp;<a href="./files/background-notes.pdf" target="_blank">Background notes</a> (PDF, 168KB)
                    </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.dataset;
}


export default connect(mapStateToProps)(Details)