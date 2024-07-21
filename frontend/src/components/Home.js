import React from "react";
import { useNavigate } from "react-router-dom";
import vocallenslogo from "../images/vocallenslogo.png";
import technologyVocal from "../images/technologyVocal.png";

function Home() {
  const navigate = useNavigate();
  const handleUse = () => {
    navigate("/upload");
  };
  return (
    <>
      {/* Hero */}
      <div id="backontopforvocal" className=" px-4 pt-5 container">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 lh-1 fw-bold ">
              VocalLens: Revolutionizing Vocal Health Analysis
            </h1>
            <p className="lead">
              Empowering you to monitor your vocal health effortlessly with just
              a smartphone.
            </p>
            <div className="my-4 d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button onClick={handleUse} className="startstop">
                Use Now
              </button>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src={vocallenslogo} alt="logo" />
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="position-relative overflow-hidden p-3 m-md-3 text-center">
        <div className="col-md-8 p-lg-5 mx-auto">
          <h1 className="display-3 fw-bold">Welcome to VocalLens!</h1>
          <h3 className="fw-normal  mb-4 my-4">
            VocalLens introduces a framework for screening Specific Language
            Impairment (SLI) in children by detecting phoneme-level
            mispronunciations. It translates these detections into symbolic
            sequences for precise assessment, achieving high accuracy with AUC
            over 0.71 and a recall rate up to 71.5% on the CHILDES dataset.
          </h3>
        </div>
        <div className="product-device shadow-sm d-none d-md-block" />
        <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
      </div>

      {/* Technology */}

      <div className="container col-xxl-8 px-4 ">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={technologyVocal}
              className="d-block mx-lg-auto img-fluid"
              alt="Technology Overview"
              width={700}
              height={500}
              loading="lazy"
              style={{ border: "1px solid black", borderRadius: "50px" }}
            />
            <p style={{ marginTop: "10px", marginLeft: "20px" }}>
              <b>Fig.</b> A detailed view of the acoustic-based detection (ABD)
              framework
            </p>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold  lh-1 mb-3">The Technology</h1>
            <p className="lead">
              VocalLens utilizes state-of-the-art voice analysis algorithms to
              examine vocal health. The app is trained on a diverse dataset of
              vocal samples, allowing it to accurately detect various vocal
              conditions and provide instant feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}

      <h2
        id="features"
        style={{
          textAlign: "center",
        }}
        className="display-7 fw-bold  lh-1 mb-3 features"
      >
        Features
      </h2>
      <section id="how-it-works">
        <div className="steps">
          <article className="card-steps">
            <div className="card-img">
              <div className="card-imgs pv delete"></div>
            </div>
            <div className="project-info">
              <div className="flex">
                <div className="project-title">Self-Examination</div>
              </div>
              <span className="lighter">
                VocalLens allows you to perform a thorough self-examination of
                your vocal health. By simply recording a voice sample, you can
                receive a comprehensive analysis.
              </span>
            </div>
          </article>

          <article className="card-steps">
            <div className="card-img">
              <div className="card-imgs pv delete"></div>
            </div>
            <div className="project-info">
              <div className="flex">
                <div className="project-title">Friendly Interface</div>
              </div>
              <span className="lighter">
                Our app is designed with user experience in mind. The intuitive
                interface makes it easy for anyone to navigate and use the app
                effectively.
              </span>
            </div>
          </article>

          <article className="card-steps">
            <div className="card-img">
              <div className="card-imgs pv delete"></div>
            </div>
            <div className="project-info">
              <div className="flex">
                <div className="project-title">Privacy & Security</div>
              </div>
              <span className="lighter">
                We prioritize your privacy. All user data is securely stored and
                processed, ensuring that your personal information remains
                confidential.
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Research papers */}
      <div className="research-papers-border">
        <div className="research-papers">
          <h1 className="display-5 fw-bold  lh-1 my-3 mb-3">
            Research Publications
          </h1>
          <p>
            Vocal Lens is a framework that can screen and detect multiple
            diseases.
          </p>
          <div class="publication-category">
            <h3 className="display-10 fw-bold  lh-1 mb-3 ">
              Parkinson's Disease
            </h3>
            <ul>
              <li>
                Sanjana Singh, <b>Wenyao Xu</b>, "Robust Detection of
                Parkinson's Disease using Harvested Smartphone Voice Data: A
                Telemedicine Approach",
                <em>
                  Telemedicine and e-Health Journal <b>(TMJ)</b>
                </em>
                , Volume 26, Issue 3, Pages 327-334, March 2020
              </li>
              <li>
                Hanbin Zhang, Chenhan Xu, Huining Li, Aditya Singh Rathore, Chen
                Song, Zhisheng Yan, Dongmei Li, Feng Lin, Kun Wang,{" "}
                <b>Wenyao Xu</b>, “PDMove: Towards Passive Medication Adherence
                Monitoring of Parkinson's Disease using Smartphone-based Gait
                Assessment”,
                <em>
                  ACM on Interactive, Mobile, Wearable and Ubiquitous
                  Technologies <b>(IMWUT)</b>
                </em>
                , Volume 3, Number 3, September 2019
              </li>
              <li>
                Hanbin Zhang, Gabriel Guo, Chen Song, Chenhan Xu, Kevin Cheung*,
                Jasleen Alexis, Huining Li, Dongmei Li, Kun Wang,
                <b>Wenyao Xu</b>, “PDLens: Smartphone Knows Drug Effectiveness
                among Parkinson's via Daily-Life Activity Fusion”,
                <em>
                  ACM International Conference on Mobile Computing and
                  Networking <b>(MobiCom’20)</b>
                </em>
                , London, UK, October 2020
              </li>
              <li>
                Hanbin Zhang, Chen Song, Aosen Wang, Chenhan Xu, Dongmei Li,
                Wenyao Xu, “PDVocal: Towards Privacy-preserving Parkinson’s
                Disease Early Detection using Passive Body Sounds”,
                <em>
                  ACM International Conference on Mobile Computing and
                  Networking (MobiCom’19)
                </em>
                , Los Cabos, Mexico, October 2019
              </li>
            </ul>
          </div>

          <div class="publication-category">
            <h3 className="display-10 fw-bold  lh-1 mb-3 ">
              Developmental Speech Disorders
            </h3>
            <ul>
              <li>
                Hanbin Zhang, Chen Song, Aosen Wang, Chenhan Xu, Dongmei Li,
                <b>Wenyao Xu</b>, “PDVocal: Towards Privacy-preserving
                Parkinson’s Disease Early Detection using Passive Body Sounds”,
                <em>
                  ACM International Conference on Mobile Computing and
                  Networking
                  <b>(MobiCom’19)</b>
                </em>
                , Los Cabos, Mexico, October 2019
              </li>
            </ul>
          </div>

          <div class="publication-category">
            <h3 className="display-10 fw-bold  lh-1 mb-3 ">
              Developmental Language Disorders
            </h3>
            <ul>
              <li>
                Wei Bo, Matthew Rubino, <b>Wenyao Xu</b>, “A
                Mispronunciation-Based Voice-Omics Representation Framework for
                Screening Speech and Language Impairments in Children”,
                <em>
                  IEEE International Conference on Healthcare Informatics
                  <b>(ICHI’24)</b>
                </em>
                , Orlando, FL, June 2024
              </li>
            </ul>
          </div>

          <div class="publication-category">
            <h3 className="display-10 fw-bold  lh-1 mb-3 ">Covid-19</h3>
            <ul>
              <li>
                Huining Li, Xingyu Chen, Xiaoye Qian, Huan Chen, Zhengxiong Li,
                Soumyadeep Bhattacharjee, Hanbin Zhang, Ming-Chun Huang,{" "}
                <b>Wenyao Xu</b>, "An Explainable COVID-19 Detection System
                based on Human Sounds",
                <em>
                  Elsevier Smart Health <b>(SH)</b>
                </em>
                , Volume 26, December 2022, Pages 100332
              </li>
            </ul>
          </div>

          <div class="publication-category">
            <h3 className="display-10 fw-bold  lh-1 mb-3 ">
              Multi-label Biomarkers
            </h3>
            <ul>
              <li>
                Soumyadeep Bhattacharjee, <b>Wenyao Xu</b>, "VoiceLens: A
                Multi-view Multi-class Disease Classification Model through
                Daily-Life Speech Data",
                <em>
                  Elsevier Smart Health <b>(SH)</b>
                </em>
                , Volume 23, March 2022
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team */}
      <div
        id="team"
        className="album py-5"
        style={{
          marginTop: "30px",
        }}
      >
        <section style={{ margin: "5%" }} id="team">
          <h3 className="display-5 fw-bold  lh-1 mb-3">Meet the Team</h3>
          <p className="lead">
            Our dedicated team of researchers and developers is passionate about
            improving health. Our team brings together expertise in machine
            learning, development, deep learning, and mobile technology to
            create a user-friendly and effective solution.
          </p>
        </section>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar" />
                <div className="profile-name">Wei Bo</div>
                <div className="profile-position">weibo@buffalo.edu</div>
              </div>
              <ul className="profile-social">
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z" />
                  </svg>
                </li>
              </ul>
            </div>

            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar" />
                <div className="profile-name">Matthew Rubino </div>
                <div className="profile-position">mrrubino@buffalo.edu</div>
              </div>
              <ul className="profile-social">
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar" />
                <div className="profile-name">Wenyao Xu</div>
                <div className="profile-position">wenyaoxu@buffalo.edu</div>
              </div>
              <ul className="profile-social">
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar" />
                <div className="profile-name">Ayush Srivastava</div>
                <div className="profile-position">ayushsri@buffalo.edu</div>
              </div>
              <ul className="profile-social">
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z" />
                  </svg>
                </li>
                <li className="profile-social__item">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back on top */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <a
          style={{ display: "flex", justifyContent: "center" }}
          href="#backontopforvocal"
          className="backontop"
        >
          Back on top
        </a>
      </div>
    </>
  );
}

export default Home;
