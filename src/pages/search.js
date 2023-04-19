import React, {useState, useEffect} from "react";
import {Layout, Menu, Typography, Input, Button, Space, Card, Col, Row, Alert, Badge} from "antd";
import axios from "axios";

const {Header, Content, Footer, Sider} = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

function formatCurrencyVND(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    return formatter.format(number);
}

export default function Search() {


    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const handleSearch = () => {
        axios.get(`/api/products?title=${query}`).then((res) => {
            setResults(res.data);
        });
    };
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
            </Header>
            <Content style={{
                padding: '0 50px',
                minHeight: '90vh'
            }}>

                <Row>
                    <Space style={{
                        width: '100%',
                        margin: '10px'
                    }}>
                        <Input
                            placeholder="Enter a title"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button type="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Space>
                </Row>
                {results.length > 0 && (
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}>
                        {results.map((item, index) => (
                            <Col className="gutter-row" key={index} span={6}
                                 xs={24} sm={6}
                                 style={{marginBottom: 10}}>
                                <Card title={item.title} bordered={false}
                                      hoverable
                                      cover={<img alt={item.title} src={item.image.src}/>}>
                                    <div className="price" style={{
                                        marginBottom: '20px'
                                    }}>
                                        <Space size={24}>
                                            <span>{formatCurrencyVND(item.variants[0].price)}</span>
                                            {item.variants[0].compare_at_price > 0 && (
                                                <del>{formatCurrencyVND(item.variants[0].compare_at_price)}</del>
                                            )}
                                        </Space>
                                    </div>
                                    <div className="is-quantity-stock">
                                        <Space size={24}>
                                            {item.variants[0].inventory_management == null ?
                                                <Alert message="Không quản lý kho" type="success"/>
                                                :
                                                <Alert message="Có quản lý tồn kho" type="warning"/>}

                                            <div className="stock">
                                                Số lượng : <span style={{
                                                color: `${item.variants[0].inventory_quantity > 0 ? '#28a71a' : '#ff4d4f'}`,
                                                fontWeight: 'bold',
                                            }}
                                            >{item.variants[0].inventory_quantity}</span>
                                            </div>
                                        </Space>
                                    </div>

                                </Card>

                            </Col>
                        ))}
                        <Col>

                        </Col>
                    </Row>
                )}
            </Content>

        </Layout>

    )
}