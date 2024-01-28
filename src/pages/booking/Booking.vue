<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
    <div>
      <h1>Kiddocare Booking Form</h1>
      <form @submit.prevent="submitForm" v-if="!formSubmitted">
        <span>Name</span>
        <input 
          v-model="name"
          type="text"
          placeholder="Enter your name" 
        /><br>
        <span>Email</span>
        <input 
          v-model="email"
          type="email"
          placeholder="Enter your email" 
        /><br>
        <span>Phone No</span>
        <input 
          v-model="number"
          type="number"
          placeholder="Enter your phone number"
        /><br>
        <span>Address</span>
        <textarea 
          v-model="address"
          placeholder="Enter your address">
        </textarea><br>
        <span>Reservation Datetime</span>
        <input 
          v-model="resDate"
          type="date"
          @change="console.log(resDate)"
        />
        <input 
          v-model="resTime"
          type="time"
          @change="console.log(resTime)"
        /><br>
        <div v-for="(child, index) in children" :key="index" class="childbox">
            <span>Child {{ child.num }}</span><br>
            <span>Name</span>
            <input 
                v-model="child.name"
                type="text"
                placeholder="Enter your child name" 
            /><br>
            <span>Age</span>
            <select v-model="child.age.years">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
            <span>years</span>
            <select v-model="child.age.months">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
            </select>
            <span>months</span>
            <br>
        </div>
        <button type="button" @click="count++;addChildren(count)">Add children</button><br>
        <input 
          class="submit" 
          type="submit" 
          value="Submit"
        >
      </form>
      <div v-if="formSubmitted">
        <h3>Form Submitted</h3>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>Phone Number: {{ number }}</p>
        <p>Address: {{ address }}</p>
        <p>Reservation Date & Time: {{ resDate }} {{ resTime }}</p>
        <div v-for="(child, index) in children" :key="index" class="childbox">
            <p>Child {{ child.num }}</p>
            <p>Name: {{ child.name }}</p>
            <p>Age {{ child.age.years }} years {{ child.age.months }} months</p>
        </div>
        <small>Our person in charge will contact your for further confirmation. Thanks</small>
      </div>
    </div>
  </template>
<style>
    form {
      padding: 10px;
      border: 2px solid black;
      border-radius: 5px;
      width:100%;
      text-align:left;
    }
  
    input {
      padding: 4px 8px;
      margin: 4px;
    }
  
    span {
      font-size: 18px;
      margin: 4px;
      font-weight: 500;
    }

    .childbox{
        border: 2px solid black;
        border-radius: 5px;
        margin:  4px;
    }
  
    .submit {
      font-size: 15px;
      color: #fff;
      background: #222;
      padding: 6px 12px;
      border: none;
      margin-top: 8px;
      cursor: pointer;
      border-radius: 5px;
    }
</style>

<script lang="ts">
export default {
      data() {
        return {
          name: "",
          email: "",
          number: +60,
          address: "",
          resDate: "",
          resTime: "",
          children:[
            {
                name: "",
                num: 1,
                age: {
                    years: 0,
                    months: 1
                }
            }
          ],
          formSubmitted: false
        };
      },
      methods: {
        addChildren: function (count){
            if(count <= 4){
                this.children.push(
                {
                    name: "",
                    num: count,
                    age: {
                        years: 0,
                        months: 1
                    }
                }
            );
            }else{
                alert("Maximum 4 children only.");
            }      
        },
        submitForm: function () {
            var curDatetime = new Date();
            var resDatetime = new Date(this.resDate + ' ' + this.resTime);
            if(curDatetime > resDatetime){ alert("Datetime selected is in the past"); return; }

            var resDatetimeSixHrsAgo = new Date(resDatetime);
            resDatetimeSixHrsAgo.setHours(resDatetime.getHours() - 6);
            if(curDatetime > resDatetimeSixHrsAgo){ alert("Datetime selected less than 6 hours from current time"); return; }

            var curDatetimeSixtyDaysLater = new Date(curDatetime);
            curDatetimeSixtyDaysLater.setDate(curDatetime.getDate() + 60);
            if(resDatetime > curDatetimeSixtyDaysLater){ alert("Datetime selected must be within 60 days from today date"); return; }

            this.formSubmitted = true;
        }
      },
    };
</script>