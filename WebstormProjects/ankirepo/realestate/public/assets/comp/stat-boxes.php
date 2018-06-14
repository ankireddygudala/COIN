<div class="m-portlet ">
 <div class="m-portlet__body  m-portlet__body--no-padding">
    <div class="row m-row--no-padding m-row--col-separator-xl">
       <div class="col-md-12 col-lg-6 col-xl-3">
          <!--begin::Total Profit-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="affiliates" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col-12">
                    <div class="apro_user">
                      <img src="assets/img/users.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col-12">
                    <div class="apro_text">
                      <h2><?php total_affiliates();?></h2>
                      <h4><?php echo $lang['TOTAL_AFFILIATES'];?></h4>
                    </div>
                  </div>
                </div>
                </a>
             </div>
          </div>
          <!--end::Total Profit-->
       </div>
       <div class="col-md-12 col-lg-6 col-xl-3">
          <!--begin::New Feedbacks-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="referral-traffic" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col-12">
                    <div class="apro_user">
                      <img src="assets/img/rocket.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col-12">
                    <div class="apro_text">
                      <h2><?php total_referrals();?></h2>
                      <h4><?php echo $lang['REFERRED_VISITS'];?></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Feedbacks-->
       </div>
       <div class="col-md-12 col-lg-6 col-xl-3">
          <!--begin::New Orders-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="sales-profits" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col-12">
                    <div class="apro_user">
                      <img src="assets/img/dollar1.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col-12">
                    <div class="apro_text">
                      <h2><?php total_sales();?></h2>
                      <h4><?php echo $lang['TOTAL_SALES'];?></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Orders-->
       </div>
       <div class="col-md-12 col-lg-6 col-xl-3">
          <!--begin::New Users-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="sales-profits" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col-12">
                    <div class="apro_user">
                      <img src="assets/img/dollars-orang.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col-12">
                    <div class="apro_text">
                      <h2><?php affiliate_earnings();?></h2>
                      <h4><?php echo $lang['NET_EARNINGS'];?></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Users-->
       </div>
    </div>
 </div>
</div>