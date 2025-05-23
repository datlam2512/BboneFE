import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd'; // Import Spin from antd
import { useParams, Link } from 'react-router-dom';
import useArticle from '../../hooks/useArticle';
import './Article.css'; // CSS for custom styling
import marketing from './../../assets/images/marketing.png'
function ArticleView() {
  const { articleData, fetchArticlelrData } = useArticle();
  const { articleDetailData, fetchArticleDetail } = useArticle();
  const { Id } = useParams();
  
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await fetchArticleDetail(Id);
      await fetchArticlelrData();
      setLoading(false); // Stop loading when data is fetched
    };

    fetchData();
  }, [Id, fetchArticleDetail, fetchArticlelrData]);

  // Filter out the current article from the "Bài viết liên quan" and "Bài viết nổi bật" sections
  const filteredArticleType1 = articleData.filter((article) => article.Type === '1' && article.Id !== Id);
  const filteredArticleType2 = articleData.filter((article) => article.Type === '2' && article.Id !== Id);

  // Adjust slice to always display 3 articles, fetching next ones if available
  const relatedArticlesToShow = filteredArticleType2.slice(0, Math.min(filteredArticleType2.length, 3));
  const highlightedArticlesToShow = filteredArticleType1.slice(0, Math.min(filteredArticleType1.length, 3));

  return (
    <div className="article-view-container text-[#1079B1] pt-10 pb-14">
      {loading ? ( // Show Spin when loading
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} className="article-row py-4">
          {/* Title and Main Image Section */}
          <Col span={24} className="main-header">
            <h1 className="article-title font-bold text-center text-2xl">
              {articleDetailData.Title}
            </h1>
            <Row className="main-images mt-5">
              <Col span={12}>
                {articleDetailData.imageurls && articleDetailData.imageurls[0] && (
                  <img src={articleDetailData.imageurls[0]} alt="Main Content 1" className="main-image-1" />
                )}
              </Col>
              <Col span={12}>
                {articleDetailData.imageurls && articleDetailData.imageurls[1] && (
                  <img src={articleDetailData.imageurls[1]} alt="Main Content 1" className="main-image-1" />
                )}
              </Col>
            </Row>
          </Col>

          {/* Main Content */}
          <Col span={16} className="content-section">
            <div className="main-content">
              <p className="additional-info">
                {articleData.Content}
              </p>
              <h2 className="section-title">{articleDetailData.Content}</h2>
              <p>{articleDetailData.Header}</p>
              {articleDetailData.imageurls && articleDetailData.imageurls[2] && (
                <img src={articleDetailData.imageurls[2]} alt="Main Content 1" className="main-image-1 w-2/3 mt-9" />
              )}
              <p className="mt-9">
  {articleDetailData.Body.split('\r\n').map((text, index) => (
    <React.Fragment key={index}>
      {text.trim() ? <span>{text}</span> : <br />} {/* Handle empty lines */}
      <br />
    </React.Fragment>
  ))}
</p>
            </div>
          </Col>

          {/* Side Articles Section - Right Side */}
          <Col span={8}>
            <Row gutter={[0, 16]} className="side-section">
              {/* "Bài viết liên quan" Section */}
              <Col span={24} className="related-articles-section">
                <div className="ml-8">
                  <h2 className="side-articles-title">Bài viết liên quan</h2>
                  <div className="related-articles-list">
                    {relatedArticlesToShow.map((article, index) => (
                      <div className="related-article" key={index}>
                        <img
                          src={article.imageurls[0]}
                          alt=""
                          className="related-article-image"
                        />
                        <div>
                          <Link to={`/Article/detail/${article.Id}`}>
                            <h3 className="related-article-title">{article.Title}</h3>
                          </Link>
                          <p className="related-article-description">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              {/* "Bài viết nổi bật" Section */}
              <Col span={24} className="highlighted-articles-section">
                <div className="ml-8 mt-8">
                  <h2 className="side-articles-title">Bài viết nổi bật</h2>
                  <div className="related-articles-list">
                    {highlightedArticlesToShow.map((article, index) => (
                      <div className="related-article" key={index}>
                        <img
                          src={article.imageurls[0]}
                          alt=""
                          className="related-article-image"
                        />
                        <div>
                          <Link to={`/Article/detail/${article.Id}`}>
                            <h3 className="related-article-title">{article.Title}</h3>
                          </Link>
                          <p className="related-article-description">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
                 {/* "Bài viết nổi bật" Section */}
                 <Col span={24} className="highlighted-articles-section">
                <div className="ml-8 mt-[600px]">
                  <h2 className="side-articles-title">Thuốc trị bệnh đau nhức xương khớp số 1 Việt Nam</h2>
                  <div className="related-articles-list">
                    <img src={marketing} className='w-1/2'/>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ArticleView;
