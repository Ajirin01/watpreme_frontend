<template>
  <div class="whatsapp-interface container-fluid">
    <div class="row">
      <!-- Left Column: Contact Lists -->
      <div class="col-md-3 left-column">
        <ChatLeftArea />
      </div>

      <!-- Center Column: Chat Interface -->
      <div class="col-md-6 center-column">
        <!-- Display chat interface here -->
        <div>
          <div class="row">
            <div class="chat-options">
              <div class="row">
                <div class="col-md-6"></div>

                <div class="col-md-6 d-flex justify-content-end">
                  <div class="timer-container">
                    <span class="timer">23:45</span>
                  </div>
                  <div class="submit-as">
                    <b-dropdown text="Submit as" variant="outline-secondary" class="m-2">
                      <b-dropdown-item href="#">Ticket</b-dropdown-item>
                      <b-dropdown-item href="#">Enquiry</b-dropdown-item>
                      <b-dropdown-item href="#">Order Request</b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <div class="more-chat-options">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-container">
          <MessangerComponent/>
        </div>
      </div>

      <!-- Right Column: Advanced Filtering Attributes -->
      <div class="col-md-3 right-column">
        <!-- Display advanced filtering attributes here -->
        <ChatRightArea />
      </div>
    </div>
  </div>
</template>


<script>
import ChatLeftArea from '@/components/ui/chat/LeftArea'
import ChatRightArea from '@/components/ui/chat/RightArea'
import MessangerComponent from '@/components/chat/MessangerComponent'


export default {
  // Your Vue.js component logic here
  components:{
    ChatLeftArea,
    ChatRightArea,
    MessangerComponent
  }
};
</script>

<style scoped>
.submit-as{
  margin-top: 5px
}
.more-chat-options{
  font-size: 1.5rem;
  margin-top: 15px;
  margin-right: 10px
}
.timer{
  padding: 15px 20px;
  border: 2px green solid;
  border-radius: 50px;
  text-align: center;
  color: green;
  margin-right: 20px
}
.timer-container{
  margin-top: 20px
}
.col-md-6{
  padding: 0px !important;
  padding: 0px 4px !important
}
/* Adjustments to Materialize CSS grid */
.center-column{
  display: flex;
  flex-direction: column;
}
.chat-options{
  background-color: white;
  height: 70px;
  width: 97%;
  margin: 0 auto
}
.left-column, .center-column, .right-column {
  border: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto; /* Enable scrolling if content overflows */
}

.left-column {
  height: calc(100vh - 64px); /* Adjust for the header height */
  background-color: white;
}

.center-column {
  height: calc(100vh - 64px); /* Adjust for the header height */
}

.right-column {
  height: calc(100vh - 64px); /* Adjust for the header height */
  background-color: white;
}

.whatsapp-interface{
  margin-top: -5px;
  width: 100vw;
  margin-left: -20px;
}
</style>
