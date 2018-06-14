<div class="m-portlet ">
 <div class="m-portlet__body  m-portlet__body--no-padding">
    <div class="row m-row--no-padding m-row--col-separator-xl">
       <div class="col-lg-4 col-md-4 col-xl-4 col">
          <!--begin::Total Profit-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="#" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col">
                    <div class="apro_user">
                      <img src="assets/img/dollar3.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col" style="border: 0px solid red;">
                    <div class="apro_text">
                      <h2><?php total_sales_period($start_date, $end_date, $affiliate_filter);?></h2>
                      <h4><?php echo $lang['SALES'];?> 
						<span class="small-text">(selected period)</span></h4>
                    </div>
                  </div>
                </div>
                </a>
             </div>
          </div>
          <!--end::Total Profit-->
       </div>
       
       <div class="col-md-4 col-lg-4 col-xl-4 col">
          <!--begin::New Feedbacks-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="#" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col">
                    <div class="apro_user">
                      <img src="assets/img/dollar-r.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col">
                    <div class="apro_text">
                      <h2><?php affiliate_earnings_period($start_date, $end_date, $affiliate_filter);?></h2>
                      <h4><?php echo $lang['EARNINGS'];?> 
						<span class="small-text">(selected period)</span></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Feedbacks-->
       </div>
       
       <div class="col-lg-4 col-md-4 col-sm-6 col">
          <!--begin::New Feedbacks-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="#" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col">
                    <div class="apro_user">
                      <img src="assets/img/rocket.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col">
                    <div class="apro_text">
                      <h2><?php total_referrals_period($start_date, $end_date, $affiliate_filter);?></h2>
                      <h4><?php echo $lang['REFERRED'];?> 
						<span class="small-text">(selected period)</span></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Feedbacks-->
       </div>
       
    </div>
 </div>
</div>