<div class="m-portlet ">
 <div class="m-portlet__body  m-portlet__body--no-padding">
    <div class="row m-row--no-padding m-row--col-separator-xl">
       <div class="col-md-12 col-lg-6 col-xl-6">
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
                  <div class="col-md-8 col-sm-8 col-xl-8 col">
                    <div class="apro_text">
                      <h2><?php total_sales_period($start_date, $end_date);?>
                      <h4><?php echo $lang['TOTAL_SALES'];?> <span class="small-text">(selected period)</span></h4>
                    </div>
                  </div>
                </div>
                </a>
             </div>
          </div>
          <!--end::Total Profit-->
       </div>
       <div class="col-md-12 col-lg-6 col-xl-6">
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
                      <h2><?php affiliate_earnings_period($start_date, $end_date);?></h2>
                      <h4><?php echo $lang['AFFILIIATE_EARNINGS'];?> <span class="small-text">(selected period)</span></h4>
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