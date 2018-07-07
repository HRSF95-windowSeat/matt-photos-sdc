import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Photo from './Photo';
import ViewMore from './ViewMore';
import ViewMoreTile from './ViewMoreTile';

class PhotoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photoIndex: 0,
      isOpen: false,
      photoCount: 0,
      photoURL: '',
    };
    this.servePhotos = this.servePhotos.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickDefault = this.onClickDefault.bind(this);
    this.onCloseRequest = this.onCloseRequest.bind(this);
    this.onMovePrevRequest = this.onMovePrevRequest.bind(this);
    this.onMoveNextRequest = this.onMoveNextRequest.bind(this);
  }

  componentDidMount() {
    this.servePhotos();
  }

  onClick(evt) {
    const el = evt.target.getAttribute('src');
    const elPosition = this.state.photos.map(photo => photo.url).indexOf(el);

    this.setState({
      photoIndex: elPosition,
      isOpen: true,
    });
  }

  onClickDefault() {
    this.setState({
      photoIndex: 8,
      isOpen: true,
    });
  }

  onCloseRequest() {
    this.setState({
      isOpen: false,
    });
  }

  onMovePrevRequest() {
    this.setState({
      photoIndex: (this.state.photoIndex + (this.state.photoCount - 1)) % this.state.photoCount,
    });
  }

  onMoveNextRequest() {
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % this.state.photoCount,
    });
  }

  servePhotos() {
    axios.get(`/photos/restaurant/${this.props.match.params.restaurantId}/photos`)
      .then((response) => {
        let conditionalURL;

        if (response.data.rows[8] === undefined) {
          conditionalURL = null;
        } else {
          conditionalURL = response.data.rows[8].url;
        }
        this.setState({
          photos: response.data.rows,
          photoCount: response.data.rows.length,
          photoURL: conditionalURL,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.photos[this.state.photoIndex].url}
            nextSrc={this.state.photos[(this.state.photoIndex + 1) % this.state.photoCount].url}
            prevSrc={
              this.state.photos[
                (this.state.photoIndex + (this.state.photoCount - 1)) % this.state.photoCount
              ].url
            }
            onCloseRequest={this.onCloseRequest}
            onMovePrevRequest={this.onMovePrevRequest}
            onMoveNextRequest={this.onMoveNextRequest}
          />
        )}
        <div className="container col-lg-12">
          <div className="photo-gallery-header mb-3">
            <p>
              {this.state.photoCount} Photos
              {this.state.photoCount > 8 &&
                <ViewMore
                  photoURL={this.state.photoURL}
                  onClick={this.onClick}
                />
              }
            </p>
          </div>
        </div>
        <div className="container photo-gallery-table">
          <div className="row justify-content-center">
            <div className="photo-col">
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(0, 1).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-one"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(1, 2).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-one"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
            </div>
            <div className="photo-col">
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(2, 3).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-two"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
            </div>
            <div className="photo-col">
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(3, 4).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-three"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(4, 5).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-three"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(5, 6).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-three"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
            </div>
            <div className="photo-col">
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(6, 7).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-four"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
              <div className="photo-gallery-image">
                {
                  this.state.photos.slice(7, 8).map(photo => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      column="col-four"
                      onClick={this.onClick}
                    />
                  ))
                }
              </div>
              <div className="photo-gallery-image">
                <div className="photo-img-overlay">
                  {
                    this.state.photos.slice(8, 9).map(photo => (
                      <Photo
                        key={photo.id}
                        photo={photo}
                        column="col-four"
                        onClick={this.onClick}
                      />
                    ))
                  }
                  <div className="view-more-overlay">
                    {this.state.photoCount > 8 &&
                      <ViewMoreTile
                        photoCount={this.state.photoCount}
                        photoURL={this.state.photoURL}
                        column="col-four"
                        onClickDefault={this.onClickDefault}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PhotoTable.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      restaurantId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoTable;
