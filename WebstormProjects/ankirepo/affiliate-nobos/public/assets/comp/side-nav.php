<button class="m-aside-left-close m-aside-left-close--skin-light" id="m_aside_left_close_btn">
<i class="la la-close"></i>
</button>
<div id="m_aside_left" class="m-grid__item m-aside-left ">
   <?php $page = basename($_SERVER['PHP_SELF']);?>
   <!-- BEGIN: Aside Menu -->
   <div 
      id="m_ver_menu" 
      class="m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light " 
      data-menu-vertical="true"
      data-menu-scrollable="false" data-menu-dropdown-timeout="500"  
      >
      <ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
         <li class="m-menu__section">
            <h4 class="m-menu__section-text">
               Main Menu
            </h4>
            <i class="m-menu__section-icon flaticon-more-v3"></i>
         </li>
         <li class="m-menu__item  m-menu__item--<?php if($page=='dashboard.php'){echo 'active';}?>" aria-haspopup="true"  data-menu-submenu-toggle="hover">
            <a  href="dashboard" class="m-menu__link m-menu__toggle">
            <span class="m-menu__link-text">
            <i class="fa fa-desktop"></i> <?php echo $lang['DASHBOARD'];?>
            </span>
            <i class="m-menu__ver-arrow la la-angle-right"></i>
            </a>
         </li>
         <?php if($admin_user=='1'){?>
         <li class="m-menu__item <?php if($page=='affiliates.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
            <a  href="affiliates" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-users"></i> <?php echo $lang['AFFILIATES'];?> 
            </span>
            </a>
         </li>
         <?php $lc_on = lc_on(); if($lc_on=='1'){ ?>
         <li class="m-menu__item <?php if($page=='leads.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="leads" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-users"></i> <?php echo $lang['LEADS'];?>
            </span>
            </a>
		</li>
		<?php } ?>

		<li class="m-menu__item <?php if($page=='products.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="products" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-truck"></i> <?php echo $lang['PRODUCTS'];?>
            </span>
            </a>
		</li>
		<li class="m-menu__item <?php if($page=='sales-profits.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="sales-profits" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-shopping-cart"></i> <?php echo $lang['SALES'];?> 
            </span>
            </a>
		</li>
		<?php $rc_on = rc_on(); if($rc_on=='1'){ ?>
		<li class="m-menu__item <?php if($page=='recurring-sales.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="recurring-sales" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-refresh"></i> <?php echo $lang['RECURRING_COMMISSIONS'];?> 
            </span>
            </a>
		</li>
		<?php } ?>
		<?php $mt_on = mt_on(); if($mt_on=='1'){ ?>
		<li class="m-menu__item <?php if($page=='multi-tier.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="multi-tier" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-sitemap"></i> <?php echo $lang['MULTI_TIER_COMMISSIONS'];?>
            </span>
            </a>
		</li>
		<?php } ?>
		<li class="m-menu__item <?php if($page=='referral-traffic.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="referral-traffic" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-rocket"></i> <?php echo $lang['REFERRAL_TRAFFIC'];?>
            </span>
            </a>
		</li>

		<li class="m-menu__item <?php if($page=='banners-logos.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="banners-logos" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-image"></i> <?php echo $lang['BANNERS_AND_LOGOS'];?>
            </span>
            </a>
		</li>

		<li class="m-menu__item <?php if($page=='payouts.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="payouts" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-money"></i> <?php echo $lang['PAYOUTS'];?>
            </span>
            </a>
		</li>
		<li class="m-menu__item  m-menu__item--<?php if($page=='fixed-commissions.php'){echo 'submenu active';}?>" aria-haspopup="true"  data-menu-submenu-toggle="hover">
			<a  href="#" class="m-menu__link m-menu__toggle">
				
				<span class="m-menu__link-text">
					<i class="fa fa-themeisle"></i> <?php echo $lang['COMMISSION_SETTINGS'];?>
				</span>
				<i class="m-menu__ver-arrow la la-angle-right"></i>
			</a>
			<div class="m-menu__submenu ">
				<span class="m-menu__arrow"></span>
				<ul class="m-menu__subnav">
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="fixed-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['FIXED_COMMISSIONS'];?>
							</span>
						</a>
					</li>
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="sales-volume-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['SALES_VOLUME_COMMISSIONS'];?>
							</span>
						</a>
					</li>
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="cpc-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['CPC_COMMISSIONS'];?>
							</span>
						</a>
					</li>
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="recurring-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['RECURRING_COMMISSIONS'];?>
							</span>
						</a>
					</li>
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="multi-tier-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['MULTI_TIER_COMMISSIONS'];?>
							</span>
						</a>
					</li>
					<li class="m-menu__item " aria-haspopup="true"  data-redirect="true">
						<a  href="lead-commissions" class="m-menu__link ">
							<span class="m-menu__link-text">
								<?php echo $lang['LEAD_COMMISSIONS'];?>
							</span>
						</a>
					</li>
				</ul>
			</div>
		</li>


		<li class="m-menu__item <?php if($page=='settings.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="settings" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-cog"></i> <?php echo $lang['WEBSITE_INTEGRATION'];?>
            </span>
            </a>
		</li>
		<div class="side-heading"><?php echo $lang['TOP_AFFILIATES'];?></div>
		<?php top_affiliates_list(); ?>
		<?php } else { ?>
		<li class="m-menu__item <?php if($page=='leads.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="leads" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-user"></i> <?php echo $lang['MY_LEADS'];?>
            </span>
            </a>
		</li>
		<li class="m-menu__item <?php if($page=='banners-logos.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="banners-logos" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-picture"></i> <?php echo $lang['BANNERS_AND_LOGOS'];?>
            </span>
            </a>
		</li>

		<li class="m-menu__item <?php if($page=='products.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="products" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-truck"></i> <?php echo $lang['PRODUCTS'];?>
            </span>
            </a>
		</li>
		<li class="m-menu__item <?php if($page=='my-sales.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="my-sales" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-shopping-cart"></i> <?php echo $lang['SALES'];?>
            </span>
            </a>
		</li>
		<?php $rc_on = rc_on(); if($rc_on=='1'){ ?>
		<li class="m-menu__item <?php if($page=='my-recurring-sales.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="my-recurring-sales" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-refresh"></i> <?php echo $lang['RECURRING_COMMISSIONS'];?>
            </span>
            </a>
		</li>
		<?php } ?>
		<?php $mt_on = mt_on(); if($mt_on=='1'){ ?>
		<li class="m-menu__item <?php if($page=='my-multi-tier.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="my-multi-tier" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-sitemap"></i> <?php echo $lang['MULTI_TIER_COMMISSIONS'];?>
            </span>
            </a>
		</li>
		<?php } ?>
		<li class="m-menu__item <?php if($page=='my-traffic.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="my-traffic" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-rocket"></i> <i class="fa-rocket"></i> <?php echo $lang['REFERED_TRAFFIC'];?>
            </span>
            </a>
		</li>
		<li class="m-menu__item <?php if($page=='my-payouts.php'){echo 'active';}?>" aria-haspopup="true"  data-redirect="true">
			<a  href="my-payouts" class="m-menu__link ">
            <span class="m-menu__link-text">
            <i class="fa fa-money"></i> <?php echo $lang['PAYOUTS'];?>
            </span>
            </a>
		</li>
		<?php } ?>
      </ul>
   </div>
   <!-- END: Aside Menu -->
</div>