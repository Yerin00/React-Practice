import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    function RenderDish({dish}) {
        return (
            <Card>
                <CardBody>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    function RenderComments({comments, postComment, dishId}) {
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
                    <CommentForm dishId={dishId} postComment={postComment} />

                </div>
            )

        }
        else {
            return (
                <div></div>
            )
        }

    }

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);
    
    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
            // alert("Current State is: " + JSON.stringify(values));
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    

        render() {
            return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg mr-2"></span>Submit Comment</Button>
                            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm className="container" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor=".rating">Rating</Label>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">                            
                            <Label htmlFor=".yourname">Your Name</Label>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                className="form-control"
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less',
                                }}
                            />
                        </Row>
                        <Row className="form-group">                            
                            <Label htmlFor=".comment">Comment</Label>                                
                            <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control" />
                        </Row>
                        <Row className="form-group">
                            <Button type="submit" color="primary">Submit</Button>
                        </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>


            )
      }
    }
    
    

    const DishDetail = (props) => {
        if (props.isLoading) {
            return (
                // conditional rendering
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                // conditional rendering
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md m-1">
                            <RenderDish dish={props.dish} />
                            
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderComments comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            />
                            
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }

export default DishDetail;