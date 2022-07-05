import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
   

    renderDish(dish) {
        return (
            <Card>
                <CardBody>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments(comments) {
        if (comments != null) {
            const commentList = comments.map((comment) => {
                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        {/* <li>-- {comment.author},{new Date(comment.date).toDateString()}</li>| */}
                        <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric', month: 'short', day: '2-digit'
                                }).format(new Date(comment.date))}</li>
                    </ul>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    {commentList}
                </div>
            )

        }
        else {
            return (
                <div></div>
            )
        }

    }

    render() {
        const {dish} = this.props;
        if (dish != null) {
            console.log(dish.name);
            return (
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1" >
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1" >
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }
}

export default DishDetail;