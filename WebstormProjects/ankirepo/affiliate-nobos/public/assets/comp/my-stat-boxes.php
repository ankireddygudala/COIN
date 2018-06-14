<?php $cpc_on = cpc_on();
if($cpc_on=='1'){$col='3';}else{$col='4';}?>
<div class="m-portlet ">
 <div class="m-portlet__body  m-portlet__body--no-padding">
    <div class="row m-row--no-padding m-row--col-separator-xl">
       <div class="col-lg-<?php echo $col;?> col-md-<?php echo $col;?>  col-sm-6 col-xs-12">
          <!--begin::Total Profit-->
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
                      <h2><?php my_total_referrals($owner);?>
                      <h4><?php echo $lang['REFERRED_VISITS'];?></h4>
                    </div>
                  </div>
                </div>
                </a>
             </div>
          </div>
          <!--end::Total Profit-->
       </div>
       <?php if($cpc_on=='1'){ ?>
       <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <!--begin::New Feedbacks-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="#" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col">
                    <div class="apro_user">
                      <img src="assets/img/dollars-orang.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col">
                    <div class="apro_text">
                      <h2><?php my_total_cpc_earnings($owner);?></h2>
                      <h4><?php echo $lang['CPC_EARNINGS'];?></span></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Feedbacks-->
       </div>
       <?php } ?>
        <div class="col-lg-<?php echo $col;?> col-md-<?php echo $col;?> col-sm-6 col-xs-12">
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
                      <h2><?php my_total_sales($owner);?></h2>
                      <h4><?php echo $lang['SALES'];?></h4>
                    </div>
                  </div>
                </div>
              </a>
             </div>
          </div>
          <!--end::New Feedbacks-->
       </div>
       <div class="col-lg-<?php echo $col;?> col-md-<?php echo $col;?> col-sm-6 col-xs-12">
          <!--begin::New Feedbacks-->
          <div class="m-widget24">
             <div class="m-widget24__item">
              <a href="#" class="apro-link">
                <div class="row m-row--no-padding">
                  <div class="col-md-4 col-sm-4 col-xl-4 col">
                    <div class="apro_user">
                      <img src="assets/img/dollar-g.svg" alt="" class="img-responsive">
                    </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xl-8 col">
                    <div class="apro_text">
                      <h2><?php balance($owner);?></h2>
                      <h4><?php echo $lang['BALANCE'];?></h4>
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