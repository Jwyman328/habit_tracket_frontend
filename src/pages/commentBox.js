import React, {Component} from 'react';

class CommentBox extends Component{

    state = {
        comment: ''
    }

    handleChange = (event) => {
        let value = event.target.value
        this.setState({comment:value})
    }

    handleFormSubmit = () => {
        this.props.saveComment(this.state.comment)
        this.setState({comment:''})
    }
    
    render(){
        return(
            <form>
                <h4>
                    Add a comment
                </h4>
                <textarea onChange={this.handleChange} value={this.state.comment}/>
                <div>
                    <button onClick={this.handleFormSubmit} >Submit</button>
                </div>
            </form>
        )
    }
}

export default CommentBox;